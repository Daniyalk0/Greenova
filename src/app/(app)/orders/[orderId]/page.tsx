// app/orders/[orderId]/page.tsx

import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import OrderDetailsSkeleton from "./OrderDetailsSkeleton";
import OrderDetailsContent from "./OrderDetailsContent";
// import OrderDetailsContent from "@/src/components/orders/OrderDetailsContent";
// import OrderDetailsSkeleton from "@/src/components/orders/OrderDetailsSkeleton";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* STATIC PART */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0c831f] font-dmsans_semibold text-[14px] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        {/* DYNAMIC STREAMED CONTENT */}
        <Suspense fallback={<OrderDetailsSkeleton />}>
          <OrderDetailsContent orderId={Number(orderId)} />
        </Suspense>
      </div>
    </div>
  );
}