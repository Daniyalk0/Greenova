import { prisma } from "@/lib/prisma";

import {
  Package,
  ShoppingBag,
  IndianRupee,
} from "lucide-react";

export default async function StatsSection() {
  const [orderStats, productCount] = await Promise.all([
    prisma.order.aggregate({
      _count: true,
      _sum: {
        total: true,
      },
    }),

    prisma.product.count(),
  ]);

  const totalOrders = orderStats._count;
  const totalRevenue = orderStats._sum.total || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Orders"
        value={totalOrders}
        icon={<ShoppingBag className="text-blue-600" size={20} />}
      />

      <StatCard
        title="Total Revenue"
        value={`₹${totalRevenue}`}
        icon={<IndianRupee className="text-green-600" size={20} />}
      />

      <StatCard
        title="Total Products"
        value={productCount}
        icon={<Package className="text-purple-600" size={20} />}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-gray-500 truncate font-dmsans_semibold">
          {title}
        </p>

        <p className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1 text-gray-900 font-dmsans_semibold">
          {value}
        </p>
      </div>

      <div className="p-2 sm:p-3 bg-gray-50 rounded-xl flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}