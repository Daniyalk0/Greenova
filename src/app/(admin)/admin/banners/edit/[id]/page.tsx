// app/admin/banners/[id]/edit/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/prisma";

import BannerForm from "../../new/BannerForm";
import { getBannerProducts } from "../../../products/actions";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBannerPage({ params }: PageProps) {
  const { id } = await params;

  const banner = await prisma.banner.findUnique({
    where: {
      id,
    },
  });

  const { products } = await getBannerProducts();

  if (!banner) {
    notFound();
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Back Button */}
        <Link
          href="/admin/banners"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0c831f] font-dmsans_semibold text-[14px] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Banners
        </Link>

        {/* Heading */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-monasans_semibold text-gray-900 mb-1">
            Edit Banner
          </h1>

          <p className="text-gray-500 text-[14px] font-dmsans_light mb-8">
            Update banner details, image, visibility, and redirect link.
          </p>
        </div>

        {/* Form */}
        <BannerForm
          mode="edit"
          bannerId={banner.id}
       defaultValues={{
    linkType:
    (banner.linkType as "product" | "category") || "product",

  productSlug: banner.productSlug || "",

  categoryHref: banner.categoryHref || "",

  title: banner.title ?? "",
  subtitle: banner.subtitle ?? "",
  badge: banner.badge ?? "",

  cta: banner.cta ?? "",

  price: banner.price?.toString() ?? "",
  originalPrice: banner.originalPrice?.toString() ?? "",

  discountText: banner.discountText ?? "",

  imageUrl: banner.imageUrl ?? "",
}}
          products={products}
        />
      </div>
    </main>
  );
}
