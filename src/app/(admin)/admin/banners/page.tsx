// page.tsx

import Link from "next/link";
import { Plus } from "lucide-react";
import { Suspense } from "react";

import BannersContent from "./BannersContent";
import BannersSkeleton from "./BannerSkeleton";
// import BannersSkeleton from "./BannersSkeleton";

export default function AdminBannersPage() {
  return (
    <div className="max-w-6xl mx-auto mt-10 md:mt-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-monasans_semibold text-gray-900">
            Banners Management
          </h1>

          <p className="text-gray-500 text-[14px] font-dmsans_light mt-1">
            Manage your storefront homepage slides and promotions.
          </p>
        </div>

        <Link
          href="/admin/banners/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0c831f] text-white rounded-xl hover:bg-[#0a6c19] transition-all font-dmsans_semibold text-[14px]"
        >
          <Plus className="w-4 h-4" />
          Add New Banner
        </Link>
      </div>

      <Suspense fallback={<BannersSkeleton />}>
        <BannersContent />
      </Suspense>
    </div>
  );
}