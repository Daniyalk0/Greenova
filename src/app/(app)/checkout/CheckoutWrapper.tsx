import { prisma } from "@/lib/prisma";
import { authConfig } from "../../api/auth/[...nextauth]/auth.config";
import { getServerSession } from "next-auth";
import CheckoutClient from "./CheckoutClient";
import { calcOrderSummary } from "@/lib/calcOrderSummary";

export default async function CheckoutWrapper() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    return <div>Please login</div>;
  }

  const userId = session.user.id;

  // ✅ parallel queries
  const [cartItems, addresses] = await Promise.all([
    prisma.cart.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            basePricePerKg: true,
            imageUrl: true,
            discount: true,
          },
        },
      },
    }),
    prisma.address.findMany({
      where: { userId },
    }),
  ]);

  const normalized = cartItems.map((item) => ({
    ...item.product,
    cartId: item.id,
    weight: item.weight,
    totalPrice: item.totalPrice,
    productId: item.id,
  }));

  const pricing = calcOrderSummary(normalized);
  // console.log(pricing);
  

  // optional: keep OR move to client for even faster UX
  const pincodes = addresses.map((a) => a.pincode);

  const serviceAreas = await prisma.serviceArea.findMany({
    where: {
      pincode: { in: pincodes },
    },
  });

  const serviceMap = new Map(
    serviceAreas.map((area) => [area.pincode, area.status])
  );

  const addressesWithStatus = addresses.map((addr) => ({
    ...addr,
    serviceStatus: serviceMap.get(addr.pincode) || "UNAVAILABLE",
  }));

  return (
    <CheckoutClient
      cartItems={normalized}
      addresses={addressesWithStatus}
      pricing={pricing}
    />
  );
}