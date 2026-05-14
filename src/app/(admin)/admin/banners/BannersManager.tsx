"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Eye,
  EyeOff,
  GripVertical,
  Loader2,
} from "lucide-react";
import { deleteBanner, toggleBannerStatus } from "../products/actions";
import { useRouter } from "next/navigation";

type Banner = {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  isActive: boolean;
  linkType: string;
  productSlug: string | null;
  categoryHref: string | null;
};

export default function BannerManager({
  initialBanners,
}: {
  initialBanners: Banner[];
}) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const router = useRouter();

  const handleToggleActive = async (id: string) => {
    const previousBanners = banners;
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
    try {
      setTogglingId(id);
      const result = await toggleBannerStatus(id);
      if (!result.success) throw new Error(result.error);
    } catch (error) {
      console.error(error);
      setBanners(previousBanners);
      alert("Failed to update banner status.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      setDeletingId(id);
      const result = await deleteBanner(id);
      if (!result.success) throw new Error(result.error);
      setBanners((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete banner.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-4 sm:mt-10 md:mt-0 px-2 sm:px-0">
      
      {/* Main Content */}
      {banners.length > 0 ? (
        <div className="bg-transparent sm:bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-gray-200">
          
          {/* DESKTOP TABLE HEADER (Hidden on mobile) */}
          {/* FIXED: Replaced auto sizing with minmax(0, 1fr) for perfect shrinking */}
          <div className="hidden sm:grid grid-cols-[24px_minmax(0,2fr)_minmax(0,1.5fr)_100px_110px] items-center gap-4 px-5 py-4 bg-gray-50/80 border-b border-gray-200 rounded-t-2xl">
            <div></div> {/* Spacer for drag handle */}
            <div className="text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider">Banner</div>
            <div className="text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider">Link URL</div>
            <div className="text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider text-center">Status</div>
            <div className="text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider text-right">Actions</div>
          </div>

          {/* LIST BODY (Cards on Mobile, Rows on Desktop) */}
          <div className="flex flex-col gap-4 sm:gap-0 sm:divide-y sm:divide-gray-100">
            {banners.map((banner) => {
              const bannerUrl =
                banner.linkType === "product"
                  ? `/products/${banner?.productSlug}`
                  : banner.categoryHref;

              return (
                <div
                  key={banner.id}
                  // FIXED: Applied the same minmax(0, Xfr) grid layout here
                  className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-none border border-gray-100 sm:border-none shadow-sm sm:shadow-none flex flex-col sm:grid sm:grid-cols-[24px_minmax(0,2fr)_minmax(0,1.5fr)_100px_110px] sm:items-center gap-4 hover:bg-gray-50/50 transition-colors group"
                >
                  {/* Drag Handle (Hidden on Mobile) */}
                  <div className="hidden sm:flex text-gray-300 cursor-grab active:cursor-grabbing hover:text-gray-500 w-6 flex-shrink-0">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  {/* Banner Image & Info */}
                  {/* FIXED: Added min-w-0 to allow internal children to truncate */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 min-w-0">
                    <div className="relative w-full h-32 sm:w-20 sm:h-12 lg:w-24 rounded-xl sm:rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                      {(() => {
                        const ALLOWED_HOSTS = ["lzpbentohychvxyxgqmx.supabase.co"];
                        const isStoredImage =
                          typeof banner.imageUrl === "string" &&
                          ALLOWED_HOSTS.some((host) => banner.imageUrl.includes(host));

                        if (!banner.imageUrl) {
                          return <ImageIcon className="w-6 h-6 sm:w-5 sm:h-5 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />;
                        }

                        return isStoredImage ? (
                          <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" />
                        ) : (
                          <img
                            src={banner.imageUrl}
                            alt={banner.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.png"; }}
                          />
                        );
                      })()}
                    </div>
                    {/* FIXED: min-w-0 forces the text wrapper to shrink */}
                    <div className="flex flex-col min-w-0">
                      <span className="font-dmsans_semibold text-[15px] sm:text-[14px] text-gray-900 truncate">
                        {banner.title}
                      </span>
                      {banner.subtitle && (
                        <span className="font-dmsans_light text-[13px] sm:text-[12px] text-gray-500 truncate">
                          {banner.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mobile Divider */}
                  <hr className="sm:hidden border-gray-100" />

                  {/* Link URL */}
                  {/* FIXED: Added min-w-0 and block layout for proper truncation on tablet */}
                  <div className="flex justify-between items-center sm:block min-w-0 font-dmsans_light text-[13px] text-gray-600">
                    <span className="sm:hidden text-gray-400 font-dmsans_semibold text-[11px] uppercase tracking-wider flex-shrink-0">Link</span>
                    <span className="bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200 truncate block sm:inline-block max-w-[200px] sm:max-w-full text-right sm:text-left">
                      {bannerUrl}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-between items-center sm:justify-center flex-shrink-0">
                    <span className="sm:hidden text-gray-400 font-dmsans_semibold text-[11px] uppercase tracking-wider">Status</span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] lg:text-[12px] font-dmsans_semibold transition-all ${
                        banner.isActive
                          ? "bg-green-50 text-[#0c831f] border border-green-200"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {togglingId === banner.id ? (
                        <><Loader2 className="w-3 h-3 animate-spin" /> Updating</>
                      ) : banner.isActive ? (
                        <><Eye className="w-3 h-3" /> Active</>
                      ) : (
                        <><EyeOff className="w-3 h-3" /> Hidden</>
                      )}
                    </span>
                  </div>

                  {/* Mobile Divider */}
                  <hr className="sm:hidden border-gray-100" />

                  {/* Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0">
                    <span className="sm:hidden text-gray-400 font-dmsans_semibold text-[11px] uppercase tracking-wider">Actions</span>
                    <div className="flex gap-1 lg:gap-2">
                      <button
                        onClick={() => handleToggleActive(banner.id)}
                        className="p-2 sm:p-1.5 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                      >
                        {banner.isActive ? <EyeOff className="w-4 h-4 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" /> : <Eye className="w-4 h-4 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />}
                      </button>

                      <Link
                        href={`/admin/banners/edit/${banner.id}`}
                        className="p-2 sm:p-1.5 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
                      >
                        <Edit className="w-4 h-4 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(banner.id)}
                        disabled={deletingId === banner.id}
                        className="p-2 sm:p-1.5 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === banner.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gray-200 py-16 sm:py-24 px-4 flex flex-col items-center text-center shadow-sm mx-2 sm:mx-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0c831f]/10 rounded-full flex items-center justify-center mb-4 sm:mb-5 border border-[#0c831f]/20">
            <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#0c831f] opacity-90" strokeWidth={1.5} />
          </div>
          <h3 className="font-monasans_semibold text-lg sm:text-xl text-gray-900 mb-2">
            No banners created yet
          </h3>
          <p className="font-dmsans_light text-gray-500 text-[14px] sm:text-[15px] max-w-[350px] leading-relaxed mb-6">
            Engage your customers by adding beautiful promotional banners to your storefront homepage.
          </p>
          <Link
            href="/admin/banners/new"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0c831f] text-white rounded-xl hover:bg-[#0a6c19] hover:shadow-[0_4px_12px_rgba(12,131,31,0.2)] transition-all font-dmsans_semibold text-[15px]"
          >
            <Plus className="w-4.5 h-4.5" />
            Create First Banner
          </Link>
        </div>
      )}
    </div>
  );
}