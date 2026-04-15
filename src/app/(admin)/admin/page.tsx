import { prisma } from "@/lib/prisma";

import {
  Plus,
  Package,
  ShoppingBag,
  IndianRupee,
  LayoutDashboard,
  Receipt,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [orders, products] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5, // only recent orders for preview
      include: {
        user: true,
      },
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // ✅ total orders
  const totalOrders = orders.length;

  // ✅ total revenue (safe reduce)
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  // ✅ check if orders exist
  const hasOrders = totalOrders > 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mt-10 sm:mt-0 font-monasans_semibold">
          Overview
        </h1>
        <p className="text-gray-500 font-dmsans_light">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Section */}
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
          value={products.length}
          icon={<Package className="text-purple-600" size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions - Very useful during development */}
        <div className="bg-white p-2 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 font-dmsans_semibold">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/products/new"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <Plus className="mb-2 text-gray-400 group-hover:text-green-600" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-green-700 font-dmsans_light">
                Add Product
              </span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <LayoutDashboard className="mb-2 text-gray-400 group-hover:text-blue-600" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-blue-700 font-dmsans_light">
                View Storefront
              </span>
            </Link>
          </div>
        </div>

        {/* Empty State / Recent Orders */}
       <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col min-h-[300px]">
  {!hasOrders ? (
    /* --- Empty State --- */
    <div className="flex flex-col items-center justify-center text-center flex-1 py-6">
      <div className="w-16 h-16 bg-[#0c831f]/10 rounded-full flex items-center justify-center mb-4 border border-[#0c831f]/20">
        <ShoppingBag className="w-8 h-8 text-[#0c831f] opacity-90" strokeWidth={1.5} />
      </div>
      <h3 className="font-monasans_semibold text-gray-900 text-lg mb-1.5">
        No orders yet!
      </h3>
      <p className="font-dmsans_light text-gray-500 text-[14px] max-w-[250px] leading-relaxed">
        Once customers start buying your products, they will automatically appear here.
      </p>
    </div>
  ) : (
    /* --- Populated State --- */
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-monasans_semibold text-lg text-gray-900">
          Recent Orders
        </h2>
        {/* Optional: Add a "View All" link here if needed */}
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="group flex justify-between items-center p-3 sm:p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200"
          >
            {/* Left Side: Icon, ID, Email */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-[#0c831f]/30 transition-colors">
                <Receipt className="w-4 h-4 text-gray-400 group-hover:text-[#0c831f]" />
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

            {/* Right Side: Total & Date */}
            <div className="text-right flex-shrink-0 flex items-center gap-4">
              <div>
                <p className="font-dmsans_semibold text-[14px] text-gray-900">
                  ₹{Number(order.total).toLocaleString("en-IN")}
                </p>
                <p className="font-dmsans_light text-[12px] text-gray-400 mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
      </div>
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
    <div
      className="bg-white border border-gray-100 rounded-2xl 
                    p-4 sm:p-6 shadow-sm 
                    flex items-center justify-between gap-3"
    >
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
