import { prisma } from "@/lib/prisma";
import UsersTable from "../products/components/UsersTable";

export default async function UsersTableWrapper() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
        role: true,
      createdAt: true,
      updatedAt: true,
      orders: {
        select: {
          id: true,
          total: true,
        },
      },
    },
  });

  const serializedUsers = users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    orders: user.orders.map((order) => ({
      id: order.id,
      totalAmount: order.total,
    })),
  }));

  return <UsersTable users={serializedUsers} />;
}