import { Suspense } from "react";
import CartWrapper from "./CartWrapper";
import CartSkeleton from "./CartSkeleton";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f4f8f5] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      
      {/* ✅ Header (instant render) */}
      <div className="max-w-5xl mx-auto mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-monasans_semibold text-gray-900">
          Shopping Cart
        </h1>
        <p className="text-gray-500 text-sm sm:text-base font-dmsans_light mt-1">
          Review your selected items and proceed to checkout.
        </p>
      </div>

      {/* ✅ Suspense handles loading */}
      <Suspense fallback={<CartSkeleton />}>
        <CartWrapper />
      </Suspense>
    </div>
  );
}