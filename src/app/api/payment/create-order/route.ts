import Razorpay from "razorpay"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
// import { authConfig } from "@/lib/auth"
import { PaymentMethod, OrderStatus } from "@prisma/client"
import { authConfig } from "../../auth/[...nextauth]/auth.config"

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function POST(req: Request) {

  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { items, addressId, paymentType } = await req.json()

  if (!items || items.length === 0) {
    return Response.json({ error: "Cart empty" }, { status: 400 })
  }

  const address = await prisma.address.findUnique({
    where: { id: addressId }
  })

  if (!address) {
    return Response.json({ error: "Address not found" }, { status: 400 })
  }

  const productIds = items.map((i: any) => i.id)

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } }
  })

  let total = 0

  const orderItems = items.map((item: any) => {

    const product = products.find(p => p.id === item.id)

    if (!product) {
      throw new Error("Product not found")
    }

    const originalPrice = product.basePricePerKg
    const discountPercent = product.discount ?? 0

    const discountedPrice =
      originalPrice - (originalPrice * discountPercent) / 100

    const lineTotal = discountedPrice * item.weight

    total += lineTotal

    return {
      productId: item.id,
      weight: item.weight,
      originalPrice,
      discountPercent,
      discountedPrice,
      lineTotal
    }
  })

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      addressId,
      total,
      paymentType : paymentType === "cod" ? PaymentMethod.COD : PaymentMethod.RAZORPAY  ,

      status:
        paymentType === PaymentMethod.COD
          ? OrderStatus.PLACED
          : OrderStatus.PENDING,

      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,

      items: {
        create: orderItems
      }
    }
  })
  await prisma.cart.deleteMany({
  where: {
    userId: session.user.id
  }
})

  if (paymentType === PaymentMethod.COD) {

    await prisma.cart.deleteMany({
  where: {
    userId: session.user.id
  }
})

    return Response.json({
      success: true,
      orderId: order.id
    })
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: total * 100,
    currency: "INR",
    receipt: `order_${order.id}`
  })

  await prisma.order.update({
    where: { id: order.id },
    data: {
      razorpayOrderId: razorpayOrder.id
    }
  })

  return Response.json({
    orderId: order.id,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount
  })
}