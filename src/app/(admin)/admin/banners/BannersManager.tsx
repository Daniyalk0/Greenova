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
} from "lucide-react";

type Banner = {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
};

export default function BannerManager({
  initialBanners,
}: {
  initialBanners: Banner[];
}) {
  // In a real app, you would use Server Actions to update this data
  // For now, we store it in local state so the UI is interactive
  const [banners, setBanners] = useState<Banner[]>(initialBanners);

  // Placeholder function for toggling active status
  const handleToggleActive = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b)),
    );
    // TODO: Call your Server Action here to update DB
    // e.g., await toggleBannerStatus(id);
  };

  // Placeholder function for deleting
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    setBanners((prev) => prev.filter((b) => b.id !== id));
    // TODO: Call your Server Action here to delete from DB
    // e.g., await deleteBanner(id);
  };

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

        {/* Add New Banner Button */}
        <Link
          href="/admin/banners/new" // Route to your "Create Banner" form
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0c831f] text-white rounded-xl hover:bg-[#0a6c19] hover:shadow-[0_4px_12px_rgba(12,131,31,0.2)] transition-all font-dmsans_semibold text-[14px] flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add New Banner
        </Link>
      </div>

      {/* Main Content */}
      {banners.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead className="bg-gray-50/80 border-b border-gray-200">
                <tr>
                  <th className="w-10 px-4 py-4"></th>
                  <th className="px-5 py-4 text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider">
                    Banner
                  </th>
                  <th className="px-5 py-4 text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider">
                    Link URL
                  </th>
                  <th className="px-5 py-4 text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-4 text-[12px] font-dmsans_semibold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {banners.map((banner) => (
                  <tr
                    key={banner.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Drag Handle (Visual only for now) */}
                    <td className="px-4 py-4 text-gray-300 cursor-grab active:cursor-grabbing hover:text-gray-500 transition-colors">
                      <GripVertical className="w-5 h-5" />
                    </td>

                    {/* Banner Image & Info */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                          {(() => {
                            const ALLOWED_HOSTS = [
                              "lzpbentohychvxyxgqmx.supabase.co",
                            ];

                            const isStoredImage =
                              typeof banner.imageUrl === "string" &&
                              ALLOWED_HOSTS.some((host) =>
                                banner.imageUrl.includes(host),
                              );

                            if (!banner.imageUrl) {
                              return (
                                <ImageIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                              );
                            }

                            return isStoredImage ? (
                              <Image
                                src={banner.imageUrl}
                                alt={banner.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <img
                                src={banner.imageUrl}
                                alt={banner.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    "/placeholder.png";
                                }}
                              />
                            );
                          })()}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-dmsans_semibold text-[14px] text-gray-900 truncate max-w-[200px]">
                            {banner.title}
                          </span>
                          {banner.subtitle && (
                            <span className="font-dmsans_light text-[12px] text-gray-500 truncate max-w-[200px]">
                              {banner.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Link URL */}
                    <td className="px-5 py-4 font-dmsans_light text-[13px] text-gray-600">
                      <span className="bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200 truncate max-w-[150px] inline-block">
                        {banner.linkUrl}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-dmsans_semibold ${
                          banner.isActive
                            ? "bg-green-50 text-[#0c831f] border border-green-200"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {banner.isActive ? (
                          <>
                            <Eye className="w-3.5 h-3.5" /> Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" /> Hidden
                          </>
                        )}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle Status */}
                        <button
                          onClick={() => handleToggleActive(banner.id)}
                          title={
                            banner.isActive ? "Hide Banner" : "Show Banner"
                          }
                          className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                        >
                          {banner.isActive ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>

                        {/* Edit Banner */}
                        <Link
                          href={`/admin/banners/${banner.id}/edit`}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {/* Delete Banner */}
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gray-200 py-24 px-4 flex flex-col items-center text-center shadow-sm">
          <div className="w-20 h-20 bg-[#0c831f]/10 rounded-full flex items-center justify-center mb-5 border border-[#0c831f]/20">
            <ImageIcon
              className="w-10 h-10 text-[#0c831f] opacity-90"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="font-monasans_semibold text-xl text-gray-900 mb-2">
            No banners created yet
          </h3>
          <p className="font-dmsans_light text-gray-500 text-[15px] max-w-[350px] leading-relaxed mb-6">
            Engage your customers by adding beautiful promotional banners to
            your storefront homepage.
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
