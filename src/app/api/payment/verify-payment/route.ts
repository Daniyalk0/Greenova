import crypto from "crypto"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { OrderStatus } from "@prisma/client"
import { sendOrderConfirmationEmail } from "@/lib/sendOrderEmail"

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

  // Delete cart items after successful payment
  await prisma.cart.deleteMany({
    where: {
      userId: order.userId
    }
  })

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
      pincode: order.pincode
    }
  })
} catch (emailError) {
  console.error("Order email failed:", emailError)
}

  return NextResponse.json({
    success: true,
    orderId: order.id
  })
}