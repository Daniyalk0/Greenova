"use client";

export default function UsersSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden animate-pulse">
      
      {/* Table Head */}
      <div className="grid grid-cols-4 px-4 py-3 border-b">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded ml-auto" />
      </div>

      {/* Rows */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-4 px-4 py-4 items-center border-b"
        >
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="flex justify-end gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded" />
            <div className="h-4 w-4 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}