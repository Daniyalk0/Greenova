export function OrderSummarySkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 sm:p-7 relative overflow-hidden">
      {/* top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200" />

      {/* Items */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      {/* totals */}
      <div className="mt-6 pt-4 border-t border-dashed border-gray-200 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        <div className="flex justify-between">
          <div className="h-5 w-28 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
      </div>

      {/* button */}
      <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
        <div className="h-14 w-full bg-gray-300 rounded-xl" />
        <div className="h-3 w-48 bg-gray-200 rounded mx-auto mt-4" />
      </div>
    </div>
  );
}