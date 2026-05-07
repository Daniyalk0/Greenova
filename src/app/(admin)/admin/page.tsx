import { Suspense } from "react";
import Link from "next/link";

import {
  Plus,
  LayoutDashboard,
} from "lucide-react";
import StatsSkeleton from "./components/StatsSkeleton";
import StatsSection from "./components/StatsSection";
import RecentOrdersSkeleton from "./components/RecentOrdersSkeleton";
import RecentOrders from "./components/RecentOrders";

// import StatsSection from "./_components/stats-section";
// import RecentOrders from "./_components/recent-orders";

// import StatsSkeleton from "./_components/stats-skeleton";
// import RecentOrdersSkeleton from "./_components/recent-orders-skeleton";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mt-10 sm:mt-0 font-monasans_semibold">
          Overview
        </h1>

        <p className="text-gray-500 font-dmsans_light">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
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

        {/* Recent Orders */}
        <Suspense fallback={<RecentOrdersSkeleton />}>
          <RecentOrders />
        </Suspense>
      </div>
    </div>
  );
}