import { Suspense } from "react";
import OrdersWrapper from "./OrdersWrapper";
// import OrdersSkeleton from "@/components/OrdersSkeleton";
import { Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import OrdersClientSkeleton from "@/components/ui/loadingSkeletons/OrdersClientSkeleton";

export default function Page() {
  return (
    <div className="p-3 sm:p-4 lg:p-2 min-h-screen bg-gray-50/50">
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
        <Suspense fallback={<>  <div className="p-3 sm:p-4 lg:p-8 min-h-screen bg-gray-50/50">
              
              {/* Header Skeleton (must match real header) */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
                
                <div>
                  <div className="flex items-center gap-3">
                    {/* Icon placeholder */}
                    <div className="w-8 h-8 bg-gray-200 rounded-md animate-pulse" />
                    
                    {/* Title */}
                    <div className="h-6 sm:h-7 w-40 bg-gray-200 rounded animate-pulse" />
                  </div>
        
                  {/* Subtitle */}
                  <div className="h-4 w-56 bg-gray-200 rounded mt-2 animate-pulse" />
                </div>
        
                {/* Button */}
                <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
              </div>
        
              {/* Orders List Skeleton */}
              <OrdersClientSkeleton />
            </div></>}>
          <OrdersWrapper />
        </Suspense>
      </div>
    </div>
  );
}
