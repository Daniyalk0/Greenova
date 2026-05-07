"use client";

export default function ServiceAreaSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      
      {/* Form */}
      <div className="bg-white p-6 rounded-2xl border space-y-4">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-10 bg-gray-200 rounded-xl" />
          <div className="h-10 bg-gray-200 rounded-xl" />
          <div className="h-10 bg-gray-200 rounded-xl" />
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex justify-between p-4 border-b">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}