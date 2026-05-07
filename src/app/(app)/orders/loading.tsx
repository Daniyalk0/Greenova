// import OrdersClientSkeleton from "@/components/OrdersClientSkeleton";
import OrdersClientSkeleton from "@/components/ui/loadingSkeletons/OrdersClientSkeleton";
import { Package } from "lucide-react";

export default function Loading() {
  return (
    <div className="p-3 sm:p-4 lg:p-8 min-h-screen bg-gray-50/50">
      
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
    </div>
  );
}