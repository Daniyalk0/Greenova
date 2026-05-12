// import BannerForm from "./BannerForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BannerForm from "./BannerForm";
import { getBannerProducts } from "../../products/actions";

export default async function NewBannerPage() {
    const { products } = await getBannerProducts();
    
  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <Link
          href="/admin/banners"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0c831f] font-dmsans_semibold text-[14px] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Banners
        </Link>

        <div>
          <h1 className="text-2xl sm:text-3xl font-monasans_semibold text-gray-900 mb-1">
            Create New Banner
          </h1>
          <p className="text-gray-500 text-[14px] font-dmsans_light mb-8">
            Design and publish a new promotional banner for your storefront.
          </p>
        </div>

        <BannerForm mode="create"  products={products}/>
      </div>
    </main>
  );
}