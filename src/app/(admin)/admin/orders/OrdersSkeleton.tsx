"use client";

const OrdersSkeleton = () => {
  return (
    <div className="p-3 sm:p-4 lg:p-8 bg-gray-50/50 min-h-screen animate-pulse">
      
 

      {/* Table Skeleton */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden">
        
        {/* Table Head */}
        <div className="grid grid-cols-6 gap-4 px-3 sm:px-5 py-3 sm:py-4 border-b bg-gray-50">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-3 w-16 bg-gray-200 rounded-md" />
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y">
          {Array.from({ length: 6 }).map((_, row) => (
            <div
              key={row}
              className="grid grid-cols-6 gap-4 px-3 sm:px-5 py-3 sm:py-4 items-center"
            >
              {/* Order ID */}
              <div className="h-6 w-16 bg-gray-200 rounded-md" />

              {/* Customer */}
              <div className="space-y-1">
                <div className="h-4 w-24 bg-gray-200 rounded-md" />
                <div className="h-3 w-32 bg-gray-200 rounded-md" />
              </div>

              {/* Date */}
              <div className="hidden sm:block h-4 w-20 bg-gray-200 rounded-md" />

              {/* Total */}
              <div className="h-4 w-16 bg-gray-200 rounded-md" />

              {/* Status */}
              <div className="h-8 w-20 bg-gray-200 rounded-lg" />

              {/* Action */}
              <div className="flex justify-end">
                <div className="h-6 w-12 bg-gray-200 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersSkeleton;