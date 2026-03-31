import { prisma } from "@/lib/prisma";
import UsersTable from "../products/components/UsersTable";
// import UsersTable from "./users-table";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      orders: true,
    },
    orderBy: {
      createdAt: "desc",
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

  return (
    <div className="p-0">
      <h1 className="text-2xl sm:text-3xl text-center md:text-left font-semibold mb-6 font-monasans_semibold">Users</h1>
      <UsersTable users={serializedUsers} />
    </div>
  );
}
