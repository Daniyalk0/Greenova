"use client";

export default function ProductsSkeleton() {
  return (
    <div className=" p-3 sm:p-4 lg:p-8 bg-gray-50/50 min-h-screen animate-pulse">
      
      {/* Header */}
 

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mt-4">
        
        {/* Head */}
        <div className="grid grid-cols-4 px-3 sm:px-6 py-3 sm:py-4 border-b bg-gray-50">
          <div className="h-3 w-20 bg-gray-200 rounded-md" />
          <div className="hidden sm:block h-3 w-16 bg-gray-200 rounded-md" />
          <div className="h-3 w-16 bg-gray-200 rounded-md" />
          <div className="h-3 w-16 bg-gray-200 rounded-md ml-auto" />
        </div>

        {/* Rows */}
        <div className="divide-y">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-4 items-center px-3 sm:px-6 py-3 sm:py-4 gap-2"
            >
              {/* Name */}
              <div className="h-4 w-28 bg-gray-200 rounded-md" />

              {/* Price */}
              <div className="hidden sm:block h-4 w-16 bg-gray-200 rounded-md" />

              {/* Stock */}
              <div className="h-5 w-20 bg-gray-200 rounded-full" />

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded" />
                <div className="h-4 w-4 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}