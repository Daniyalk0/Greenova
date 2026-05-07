import { Suspense } from "react";
import OrdersWrapper from "./OrdersWrapper";
// import OrdersSkeleton from "@/components/OrdersSkeleton";
import { Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import OrdersClientSkeleton from "@/components/ui/loadingSkeletons/OrdersClientSkeleton";

export default function Page() {
  return (
    <div className="p-3 sm:p-4 lg:p-8 min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        {/* ✅ HEADER (your exact design) */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between  px-4 gap-4 my-6 sm:my-3">
          {/* Left */}
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-monasans_semibold text-gray-900 flex items-center gap-2 sm:gap-3">
              {/* Icon (scaled properly) */}
              <Package className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#0c831f] flex-shrink-0" />

              <span className="truncate">My Orders</span>
            </h1>

            <p className="font-dmsans_light text-gray-500 mt-1.5 sm:mt-2 text-[12px] sm:text-[14px] lg:text-[15px] leading-relaxed">
              View and track your recent purchases.
            </p>
          </div>

          {/* Right CTA */}
          <Link
            href="/"
            className="
      inline-flex ustify-start
      gap-1.5 sm:gap-2
      font-dmsans_semibold text-[#0c831f] hover:text-[#0a6c19]
      transition-colors
      text-[13px] sm:text-[14px] lg:text-[15px]

      w-full sm:w-auto   /* ✅ full width on mobile */
    "
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>
        </div>
        {/* ✅ DATA */}
        <Suspense fallback={<OrdersClientSkeleton />}>
          <OrdersWrapper />
        </Suspense>
      </div>
    </div>
  );
}
