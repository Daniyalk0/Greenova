import crypto from "crypto"
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
    return Response.json({ success: false })
  }

  const order = await prisma.order.update({
    where: { razorpayOrderId: razorpay_order_id },
    data: {
      status: OrderStatus.PAID,
      razorpayPaymentId: razorpay_payment_id
    }
  })

  return Response.json({
    success: true,
    orderId: order.id
  })
}