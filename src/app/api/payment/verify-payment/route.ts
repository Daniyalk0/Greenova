import crypto from "crypto";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { sendOrderConfirmationEmail } from "@/lib/sendOrderEmail";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      await req.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing payment details" },
        { status: 400 },
      );
    }

    // 1. Verify Razorpay signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(razorpay_signature),
      )
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 },
      );
    }

    // 2. Find our Greenova order
    const order = await prisma.order.findUnique({
      where: {
        razorpayOrderId: razorpay_order_id,
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
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 },
      );
    }

    // 3. Get actual payment information from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    // 4. Verify payment belongs to this Razorpay order
    if (payment.order_id !== razorpay_order_id) {
      return NextResponse.json(
        { success: false, error: "Payment/order mismatch" },
        { status: 400 },
      );
    }

    // 5. Verify amount
    const expectedAmount = order.total * 100;

    if (payment.amount !== expectedAmount) {
      return NextResponse.json(
        { success: false, error: "Payment amount mismatch" },
        { status: 400 },
      );
    }

    // 6. Verify currency
    if (payment.currency !== "INR") {
      return NextResponse.json(
        { success: false, error: "Invalid payment currency" },
        { status: 400 },
      );
    }

    // 7. Verify payment is captured
    if (payment.status !== "captured") {
      return NextResponse.json(
        { success: false, error: "Payment not captured" },
        { status: 400 },
      );
    }

    // 8. Idempotency
    // If webhook already processed this payment,
    // don't process the order again.
    if (order.status === OrderStatus.PAID) {
      return NextResponse.json({
        success: true,
        orderId: order.id,
      });
    }

    // 9. Mark order as paid
    const updatedOrder = await prisma.order.updateMany({
      where: {
        id: order.id,
        status: OrderStatus.PENDING,
      },
      data: {
        status: OrderStatus.PAID,
        razorpayPaymentId: razorpay_payment_id,
      },
    });

    // Already processed by webhook or another request
    if (updatedOrder.count === 0) {
      return NextResponse.json({
        success: true,
        orderId: order.id,
      });
    }

    // Fetch the updated order with relations
    const paidOrder = await prisma.order.findUnique({
      where: {
        id: order.id,
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

    if (!paidOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found after payment" },
        { status: 404 },
      );
    }

    // Clear cart
    await prisma.cart.deleteMany({
      where: {
        userId: paidOrder.userId,
      },
    });

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail({
        email: paidOrder.user.email!,
        order: paidOrder,
        items: paidOrder.items,
        address: {
          name: paidOrder.name,
          phone: paidOrder.phone,
          street: paidOrder.street,
          city: paidOrder.city,
          state: paidOrder.state,
          pincode: paidOrder.pincode,
        },
      });
    } catch (emailError) {
      console.error("Order email failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      orderId: paidOrder.id,
    });
  } catch (error) {
    console.error("Payment verification failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Payment verification failed",
      },
      { status: 500 },
    );
  }
}
