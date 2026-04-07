import crypto from "crypto"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { OrderStatus } from "@prisma/client"

export async function POST(req: Request) {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  } = await req.json()

  const body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex")

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const order = await prisma.order.update({
    where: { razorpayOrderId: razorpay_order_id },
    data: {
      status: OrderStatus.PAID,
      razorpayPaymentId: razorpay_payment_id
    }
  })

  // Delete cart items after successful payment
  await prisma.cart.deleteMany({
    where: {
      userId: order.userId
    }
  })

  return NextResponse.json({
    success: true,
    orderId: order.id
  })
}