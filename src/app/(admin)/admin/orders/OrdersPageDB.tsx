import { prisma } from "@/lib/prisma";
import AdminOrdersPage, { BaseOrder } from "../products/components/ordersPage";

export default async function OrdersPageDB() {
  // await new Promise((r) => setTimeout(r, 8000));
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const normalizedOrders: BaseOrder[] = orders.map((order) => ({
    id: order.id,
    date: order.createdAt.toISOString(),
    status: order.status,
    total: order.total,
    customer:
      order.user?.name ||
      order.user?.email ||
      "Unknown",
    email: order.user?.email,
    items: order.items.map((item) => ({
      id: item.id.toString(),
      name: item.product?.name ?? "Unknown product",
      imageUrl: item.product?.imageUrl ?? "",
    })),
  }));

  return <AdminOrdersPage orders={normalizedOrders} />;
}