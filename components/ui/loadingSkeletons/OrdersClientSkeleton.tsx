"use client";

export default function OrdersClientSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm animate-pulse"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 sm:pb-5 border-b border-gray-100 gap-4">
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Status */}
              <div className="h-6 w-20 bg-gray-200 rounded-full" />

              {/* Date */}
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>

            {/* Order ID */}
            <div className="h-6 w-28 bg-gray-200 rounded-lg" />
          </div>

          {/* Body */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-4 sm:pt-5 gap-5">
            
            {/* Left: items */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              
              {/* Image stack */}
              <div className="flex -space-x-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div
                    key={j}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 border-2 border-white"
                  />
                ))}

                {/* +more */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <div className="h-3 w-6 bg-gray-300 rounded" />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col min-w-0 space-y-2">
                <div className="h-4 w-40 sm:w-56 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Right: total + button */}
            <div className="flex items-center justify-between sm:justify-end sm:gap-6 w-full sm:w-auto">
              
              <div className="space-y-2">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-16 bg-gray-200 rounded" />
              </div>

              <div className="h-9 w-28 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}