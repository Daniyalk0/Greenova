import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { sendOrderConfirmationEmail } from "@/lib/sendOrderEmail";

export async function POST(req: Request) {
  try {
    const webhookSignature = req.headers.get("x-razorpay-signature");

    if (!webhookSignature) {
      return NextResponse.json(
        { error: "Missing webhook signature" },
        { status: 400 }
      );
    }

    // Razorpay signs the RAW request body
    const rawBody = await req.text();

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("hex");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(webhookSignature)
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);

    switch (event.event) {
      case "payment.captured": {
        const payment = event.payload.payment.entity;

        const razorpayOrderId = payment.order_id;
        const razorpayPaymentId = payment.id;

        if (!razorpayOrderId) {
          return NextResponse.json({ received: true });
        }

        const order = await prisma.order.findUnique({
          where: {
            razorpayOrderId,
          },
          include: {
            user: true,
            items: {
              include: {
                product: true,
              },
            },
          },
        });

        if (!order) {
          console.error(
            "Unknown Razorpay order:",
            razorpayOrderId
          );

          return NextResponse.json({ received: true });
        }

        // Already processed
        if (order.status === OrderStatus.PAID) {
          return NextResponse.json({ received: true });
        }

        // Only PENDING orders can become PAID
        const result = await prisma.order.updateMany({
          where: {
            id: order.id,
            status: OrderStatus.PENDING,
          },
          data: {
            status: OrderStatus.PAID,
            razorpayPaymentId,
          },
        });

        // Another request already processed it
        if (result.count === 0) {
          return NextResponse.json({ received: true });
        }

        // Clear cart
        await prisma.cart.deleteMany({
          where: {
            userId: order.userId,
          },
        });

        // Send confirmation email
        try {
          await sendOrderConfirmationEmail({
            email: order.user.email!,
            order,
            items: order.items,
            address: {
              name: order.name,
              phone: order.phone,
              street: order.street,
              city: order.city,
              state: order.state,
              pincode: order.pincode,
            },
          });
        } catch (emailError) {
          console.error("Order email failed:", emailError);
        }

        break;
      }

      case "payment.failed": {
        const payment = event.payload.payment.entity;

        const razorpayOrderId = payment.order_id;

        if (!razorpayOrderId) {
          return NextResponse.json({ received: true });
        }

        await prisma.order.updateMany({
          where: {
            razorpayOrderId,
            status: OrderStatus.PENDING,
          },
          data: {
            status: OrderStatus.FAILED,
          },
        });

        break;
      }

      default:
        console.log(
          "Unhandled Razorpay webhook event:",
          event.event
        );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook error:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}