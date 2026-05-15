// src/components/orders/OrderDetailsSkeleton.tsx

export default function OrderDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div>
          <div className="h-9 w-52 bg-gray-200 rounded mb-3" />

          <div className="flex gap-3">
            <div className="h-8 w-28 bg-gray-200 rounded-lg" />
            <div className="h-8 w-44 bg-gray-200 rounded-lg" />
          </div>
        </div>

        <div className="h-10 w-28 bg-gray-200 rounded-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Left */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
            
            <div className="flex justify-between mb-6">
              <div className="h-6 w-44 bg-gray-200 rounded" />
              <div className="h-6 w-20 bg-gray-200 rounded" />
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex gap-4 items-center"
                >
                  <div className="w-20 h-20 bg-gray-200 rounded-xl" />

                  <div className="flex-1">
                    <div className="h-5 w-44 bg-gray-200 rounded mb-3" />
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                  </div>

                  <div className="w-20">
                    <div className="h-4 w-16 bg-gray-200 rounded mb-2 ml-auto" />
                    <div className="h-5 w-20 bg-gray-200 rounded ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6"
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
  );
}