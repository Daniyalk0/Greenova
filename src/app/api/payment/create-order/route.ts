import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
// import { authConfig } from "@/lib/auth"
import { PaymentMethod, OrderStatus } from "@prisma/client";
import { authConfig } from "../../auth/[...nextauth]/auth.config";
import { sendOrderConfirmationEmail } from "@/lib/sendOrderEmail";
// const Razorpay = require("razorpay")

const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items, addressId, paymentType } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart empty" }, { status: 400 });
  }

  const address = await prisma.address.findUnique({
    where: { id: addressId },
  });

  if (!address) {
    return NextResponse.json({ error: "Address not found" }, { status: 400 });
  }

  const productIds = items.map((i: any) => i.id);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  let total = 0;

  const orderItems = items.map((item: any) => {
    const product = products.find((p) => p.id === item.id);

    if (!product) {
      throw new Error("Product not found");
    }

    const originalPrice = product.basePricePerKg;
    const discountPercent = product.discount ?? 0;
    const discountedPrice =
      originalPrice - (originalPrice * discountPercent) / 100;
    const lineTotal = discountedPrice * item.weight;

    total += lineTotal;

    return {
      productId: item.id,
      weight: item.weight,
      originalPrice,
      discountPercent,
      discountedPrice,
      lineTotal,
    };
  });

  const isCOD = paymentType === "cod";

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      addressId,
      total,
      paymentType: isCOD ? PaymentMethod.COD : PaymentMethod.RAZORPAY,
      status: isCOD ? OrderStatus.PLACED : OrderStatus.PENDING,
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      items: {
        create: orderItems,
      },
    },
  });

  if (isCOD) {
    await prisma.cart.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    // ✅ send order confirmation email
 const fullOrder = await prisma.order.findUnique({
  where: {
    id: order.id
  },
  include: {
    user: true,
    items: {
      include: {
        product: true
      }
    }
  }
})
await sendOrderConfirmationEmail({
  email: session.user.email!,
  order: fullOrder,
  items: fullOrder!.items,
  address
})

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
      },
      { status: 200 },
    );
  }

  if (!razorpayKeyId || !razorpayKeySecret) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: OrderStatus.FAILED },
    });

    return NextResponse.json(
      { error: "Payment gateway not configured. Please contact support." },
      { status: 500 },
    );
  }

  const razorpay = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });

  const amountInPaise = Math.round(total * 100);

  // Razorpay minimum amount is 100 paise (1 INR)
  if (amountInPaise < 100) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: OrderStatus.FAILED },
    });

    return NextResponse.json(
      { error: "Order amount must be at least ₹1.00" },
      { status: 400 },
    );
  }

  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `order_${order.id}`,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        razorpayOrderId: razorpayOrder.id,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
    });
  } catch (error: any) {
    console.error("Razorpay order creation failed:", {
      error: error.message,
      code: error.code,
      metadata: error.metadata,
      amount: amountInPaise,
      currency: "INR",
      receipt: `order_${order.id}`,
      keyId: razorpayKeyId ? "present" : "missing",
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { status: OrderStatus.FAILED },
    });

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to initialize Razorpay payment. Please try again later.",
      },
      { status: 500 },
    );
  }
}
