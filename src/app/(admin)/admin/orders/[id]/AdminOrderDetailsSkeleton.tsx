export default function AdminOrderDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="h-8 w-52 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-72 bg-gray-200 rounded" />
          </div>

          <div className="h-10 w-32 bg-gray-200 rounded-xl" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
            
            <div className="flex justify-between mb-6">
              <div className="h-6 w-40 bg-gray-200 rounded" />
              <div className="h-6 w-24 bg-gray-200 rounded" />
            </div>

            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex gap-4 items-center"
                >
                  <div className="w-20 h-20 rounded-xl bg-gray-200" />

                  <div className="flex-1">
                    <div className="h-5 w-44 bg-gray-200 rounded mb-3" />
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                  </div>

                  <div className="w-20">
                    <div className="h-5 w-16 bg-gray-200 rounded ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            
            {[1, 2].map((card) => (
              <div
                key={card}
                className="bg-white rounded-2xl border border-gray-200 p-6"
              >
                <div className="h-6 w-40 bg-gray-200 rounded mb-5" />

                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  <div className="h-4 w-4/6 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}