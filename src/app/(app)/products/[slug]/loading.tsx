export default function ProductLoading() {
  return (
    <div className="px-3 sm:px-6 lg:px-20 py-4 sm:py-6 md:mt-10 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">

        {/* LEFT: Image */}
        <div className="relative">
          <div className="bg-white rounded-2xl p-2 shadow-sm relative">
            <div className="aspect-square w-full rounded-xl bg-gray-200" />

            {/* Wishlist placeholder */}
            <div className="absolute top-3 right-3 h-10 w-10 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="flex flex-col gap-4">

          {/* Title + description */}
          <div className="flex flex-col gap-3">
            <div className="h-10 w-3/4 bg-gray-200 rounded-md" />
            <div className="h-4 w-full bg-gray-200 rounded-md" />
            <div className="h-4 w-5/6 bg-gray-200 rounded-md" />
          </div>

          {/* Price */}
          <div className="h-8 w-40 bg-gray-200 rounded-md" />

          {/* Add to cart */}
          <div className="h-12 w-full bg-gray-200 rounded-xl" />

          {/* PRODUCT DETAILS */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-5">

            {/* Rating + Stock */}
            <div className="flex items-center justify-between">
              <div className="h-5 w-20 bg-gray-200 rounded-md" />
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 py-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded-md" />
                  <div className="h-4 w-24 bg-gray-200 rounded-md" />
                </div>
              ))}
            </div>

            {/* Nutrition */}
            <div>
              <div className="h-5 w-64 bg-gray-200 rounded-md mb-3" />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 w-full bg-gray-200 rounded-lg"
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
