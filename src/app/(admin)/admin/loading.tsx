// import StatsSkeleton from "./_components/stats-skeleton";
// import RecentOrdersSkeleton from "./_components/recent-orders-skeleton";

import RecentOrdersSkeleton from "./components/RecentOrdersSkeleton";
import StatsSkeleton from "./components/StatsSkeleton";

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-8 w-40 bg-gray-200 rounded mb-3 mt-10 sm:mt-0" />
        <div className="h-4 w-72 bg-gray-100 rounded" />
      </div>

      <StatsSkeleton />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick actions */}
        <div className="bg-white p-2 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="h-6 w-36 bg-gray-200 rounded mb-6" />

          <div className="grid grid-cols-2 gap-4">
            <div className="h-28 rounded-xl border border-gray-200 bg-gray-100" />
            <div className="h-28 rounded-xl border border-gray-200 bg-gray-100" />
          </div>
        </div>

        <RecentOrdersSkeleton />
      </div>
    </div>
  );
}