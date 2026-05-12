export default function RecentOrdersSkeleton() {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[300px] animate-pulse">
      <div className="h-6 w-40 bg-gray-200 rounded mb-6" />

      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 rounded-xl border border-gray-100 bg-gray-50"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-gray-200" />

              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-48 bg-gray-100 rounded" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}