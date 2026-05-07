export function PaymentSkeleton() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
      <div className="p-5 sm:p-7">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div className="h-5 w-48 bg-gray-200 rounded" />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center p-5 border rounded-xl"
            >
              <div className="h-5 w-5 bg-gray-200 rounded-full" />
              <div className="ml-4 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-40 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}