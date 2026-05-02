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
      <div className=" sm:mt-6 lg:mt-8 p-3 sm:p-4 lg:p-8 bg-gray-50/50 min-h-screen">
      <div className="my-3 md:mb-3 md:mt-0">
        {" "}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-monasans_semibold text-gray-900">
          {" "}
          Users Management{" "}
        </h1>{" "}
        <p className="text-gray-500 text-[13px] sm:text-[14px] font-dmsans_light mt-1">
          {" "}
          Manage, monitor, and control all registered users on your
          platform.{" "}
        </p>{" "}
      </div>
      <UsersTable users={serializedUsers} />
    </div>
  );
}
