import { prisma } from "@/lib/prisma";
import { Receipt, ShoppingBag } from "lucide-react";

export default async function RecentOrders() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const recentOrders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    select: {
      id: true,
      total: true,
      createdAt: true,
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  const hasOrders = recentOrders.length > 0;

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col min-h-[300px]">
      {!hasOrders ? (
        <div className="flex flex-col items-center justify-center text-center flex-1 py-6">
          <div className="w-16 h-16 bg-[#0c831f]/10 rounded-full flex items-center justify-center mb-4 border border-[#0c831f]/20">
            <ShoppingBag
              className="w-8 h-8 text-[#0c831f] opacity-90"
              strokeWidth={1.5}
            />
          </div>

          <h3 className="font-monasans_semibold text-gray-900 text-lg mb-1.5">
            No orders yet!
          </h3>

          <p className="font-dmsans_light text-gray-500 text-[14px] max-w-[250px] leading-relaxed">
            Once customers start buying your products, they will automatically
            appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-monasans_semibold text-lg text-gray-900">
              Recent Orders
            </h2>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="group flex justify-between items-center p-3 sm:p-4 rounded-xl border border-gray-100 bg-gray-50/50"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Receipt className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="flex flex-col min-w-0 pr-3">
                    <p className="font-dmsans_semibold text-[14px] text-gray-900 truncate">
                      Order #{order.id}
                    </p>

                    <p className="font-dmsans_light text-[12px] sm:text-[13px] text-gray-500 truncate mt-0.5">
                      {order.user?.email || "Unknown user"}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-dmsans_semibold text-[14px] text-gray-900">
                    ₹{Number(order.total).toLocaleString("en-IN")}
                  </p>

                  <p className="font-dmsans_light text-[12px] text-gray-400 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}