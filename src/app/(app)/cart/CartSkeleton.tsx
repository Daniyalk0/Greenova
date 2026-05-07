export default function CartSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-4 animate-pulse">
      
      {/* Cards */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border rounded-2xl p-4 sm:p-6 space-y-4"
        >
          <div className="h-4 w-32 bg-gray-200 rounded" />

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}