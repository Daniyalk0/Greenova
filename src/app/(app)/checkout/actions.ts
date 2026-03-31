// "use server";
// import { getServerSession } from "next-auth";
// import { authConfig } from "../../api/auth/[...nextauth]/auth.config";
// import { prisma } from "@/lib/prisma";

// type Item = {
//   productId: number
//   weight: number
// }

// export async function createOrder({
//   items,
//   paymentType,
//   addressId
// }: {
//   items: Item[]
//   paymentType: string
//   addressId: number
// }) {

//   const session = await getServerSession(authConfig)

//   if (!session?.user?.id) {
//     throw new Error("User not authenticated")
//   }

//   const productIds = items.map(i => i.productId)

//   const products = await prisma.product.findMany({
//     where: { id: { in: productIds } }
//   })

//   let total = 0

// const orderItems = items.map(item => {

//   const product = products.find(p => p.id === item.productId)

//   if (!product) {
//     throw new Error("Product not found")
//   }

//   const originalPrice = product.basePricePerKg

//   const discountPercent = product.discount ?? 0

//   const discountedPrice =
//     originalPrice - (originalPrice * discountPercent) / 100

//   const lineTotal = discountedPrice * item.weight

//   total += lineTotal

//   return {
//     productId: item.productId,
//     weight: item.weight,
//     originalPrice,
//     discountPercent,
//     discountedPrice,
//     lineTotal
//   }
// })
// const status = paymentType === "cod" ? "placed" : "pending"

//  const order = await prisma.order.create({
//   data: {
//     userId: session.user.id,
//     addressId,
//     total,
//     paymentType,
//     status,
//     items: {
//       create: orderItems
//     }
//   },
//   include: {
//     items: true
//   }
// })

//   return order
// }