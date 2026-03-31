
import { prisma } from "@/lib/prisma";
import { authConfig } from "../../api/auth/[...nextauth]/auth.config";
import { getServerSession } from "next-auth";
import CheckoutClient from "./CheckoutClient";
import { calcOrderSummary } from "@/lib/calcOrderSummary";


export default async function CheckoutPage() {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    return <div>Please login</div>
  }

  const cartItems = await prisma.cart.findMany({
    where: { userId: session?.user?.id },
    include: { product: true }
  })

  const normalized = cartItems.map(item => ({
    ...item.product,
    cartId: item.id,
    weight: item.weight,
    totalPrice: item.totalPrice
  }));
  console.log("cartItems:", normalized)

  const pricing = calcOrderSummary(normalized)
  console.log("Calculated Pricing:", pricing)

  const addresses = await prisma.address.findMany({
    where: { userId: session?.user?.id }
  })


  return (
    <CheckoutClient
      cartItems={normalized}
      addresses={addresses}
      pricing={pricing}

    />
  );
}