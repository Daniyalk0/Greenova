import { AddressSectionSkeleton } from "./sectionSkeletons/AddressSectionSkeleton";
import { OrderSummarySkeleton } from "./sectionSkeletons/OrderSummarySkeleton";
import { PaymentSkeleton } from "./sectionSkeletons/PaymentsSkeleton";


export default function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-[#f4f8f5] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="h-8 sm:h-10 w-40 bg-gray-200 rounded mb-6 sm:mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT */}
          <div className="lg:col-span-8 space-y-6">
            <AddressSectionSkeleton />
            <PaymentSkeleton />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <OrderSummarySkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}