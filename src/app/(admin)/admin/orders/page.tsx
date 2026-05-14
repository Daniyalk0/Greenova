import { Suspense } from "react";
// import OrdersTable from "./OrdersTable";
import OrdersSkeleton from "./OrdersSkeleton";
import OrdersPage from "./OrdersPageDB";
import OrdersPageDB from "./OrdersPageDB";
import { Filter, Search } from "lucide-react";

export default function Page() {
  return (
    <div className=" p-0 sm:p-4 lg:p-8 bg-gray-50/50 min-h-screen">
      
      {/* ✅ HEADER (now here) */}
      <div className="max-w-6xl mx-auto mb-5 sm:mb-6 lg:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5">
        
        <div className="my-3 md:mb-3 md:mt-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-monasans_semibold text-gray-900">
            Orders Management
          </h1>
          <p className="text-gray-500 text-[13px] sm:text-[14px] font-dmsans_light mt-1">
            Manage, track, and update your customer orders.
          </p>
        </div>

        {/* ⚠️ static version (no orders.length here anymore) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
          
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[13px] sm:text-[14px] font-dmsans_light shadow-sm"
            />
          </div>

          <button className=" hidden  items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 hover:text-[#0c831f] text-[13px] sm:text-[14px] font-dmsans_semibold text-gray-700 shadow-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* ✅ DATA (Suspense) */}
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersPageDB />
      </Suspense>
    </div>
  );
}