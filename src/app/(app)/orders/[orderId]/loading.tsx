// import OrderDetailsSkeleton from "@/src/components/orders/OrderDetailsSkeleton";

import OrderDetailsSkeleton from "./OrderDetailsSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <OrderDetailsSkeleton />
      </div>
    </div>
  );
}