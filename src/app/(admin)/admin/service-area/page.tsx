import { Suspense } from "react";
import { MapPin } from "lucide-react";
import ServiceAreaWrapper from "./ServiceAreaWrapper";
import ServiceAreaSkeleton from "./ServiceAreaSkeleton";

export default function Page() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

        {/* ✅ HEADER (instant) */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-monasans_semibold text-gray-900 flex items-center gap-3">
            <MapPin className="w-7 h-7 text-[#0c831f]" />
            Service Areas
          </h1>
          <p className="text-gray-500 text-[14px] font-dmsans_light mt-1.5">
            Manage pincodes and delivery coverage statuses for your store.
          </p>
        </div>

        {/* ✅ DATA */}
        <Suspense fallback={<ServiceAreaSkeleton />}>
          <ServiceAreaWrapper />
        </Suspense>

      </div>
    </div>
  );
}