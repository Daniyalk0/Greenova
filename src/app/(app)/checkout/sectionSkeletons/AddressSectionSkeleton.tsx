export function AddressSectionSkeleton() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
      <div className="p-5 sm:p-7">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-56 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="h-10 w-40 bg-gray-200 rounded-xl" />
        </div>

        {/* Address cards */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-4 space-y-3"
            >
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-48 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}