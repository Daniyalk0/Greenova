import { prisma } from "@/lib/prisma";
import { authConfig } from "../../api/auth/[...nextauth]/auth.config";
import { getServerSession } from "next-auth";
import CheckoutClient from "./CheckoutClient";
import { calcOrderSummary } from "@/lib/calcOrderSummary";

export default async function CheckoutPage() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    return <div>Please login</div>;
  }

  const cartItems = await prisma.cart.findMany({
    where: { userId: session.user.id },
    include: { product: true },
  });

  const normalized = cartItems.map((item) => ({
    ...item.product,
    cartId: item.id,
    weight: item.weight,
    totalPrice: item.totalPrice,
  }));

  const pricing = calcOrderSummary(normalized);

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
  });

  // ✅ 1. Get all pincodes
  const pincodes = addresses.map((a) => a.pincode);

  // ✅ 2. Fetch all service areas in one query
  const serviceAreas = await prisma.serviceArea.findMany({
    where: {
      pincode: { in: pincodes },
    },
  });

  // ✅ 3. Create lookup map
  const serviceMap = new Map(
    serviceAreas.map((area) => [area.pincode, area.status])
  );

  // ✅ 4. Attach status to each address
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