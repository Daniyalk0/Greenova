"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  UploadCloud,
  Loader2,
  Image as ImageIcon,
  Link as LinkIcon,
  Eye,
  X,
} from "lucide-react";
import BannerSlide from "@/components/BannerSlide";
import {
  BannerPayload,
  createBanner,
  updateBanner,
  uploadProductImage,
} from "../../products/actions";
import { CATEGORIES } from "@/components/categoriesBar/data";

type ImageMode = "url" | "upload";

export type BannerFormData = {
  title: string;
  subtitle: string;
  badge: string;
  cta: string;
  linkUrl?: string;
  price: string;
  originalPrice: string;
  discountText: string;
  imageUrl: string;
  linkType: "product" | "category";

  productSlug?: string;
  categoryHref?: string;
};

type ProductOption = {
  id: number;
  name: string;
  slug: string;
};

type BannerFormProps = {
  defaultValues?: BannerFormData;
  bannerId?: string; // For edit mode
  mode: "create" | "edit";
  products: ProductOption[];
};

export default function BannerForm({
  defaultValues,
  bannerId,
  mode,
  products,
}: BannerFormProps) {
  const router = useRouter();
  const [openPreview, setOpenPreview] = useState(false);
  const [isPending, startTransition] = useTransition();

  const formattedDefaultValues = defaultValues
    ? {
        ...defaultValues,
        price: defaultValues.price?.toString() ?? "",
        originalPrice: defaultValues.originalPrice?.toString() ?? "",
      }
    : undefined;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid },
  } = useForm<BannerFormData>({
    mode: "onChange",
    defaultValues: formattedDefaultValues || {
      title: "",
      subtitle: "",
      badge: "",
      cta: "Shop Now",
      linkUrl: "/",
      price: "",
      originalPrice: "",
      discountText: "",
      imageUrl: "",
      productSlug: "",
    },
  });

  // --- EDIT MODE OPTIMIZATION ---
  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        price: defaultValues.price?.toString() ?? "",
        originalPrice: defaultValues.originalPrice?.toString() ?? "",
      });
    }
  }, [defaultValues, reset]);

  // --- IMAGE HANDLING LOGIC (Directly from ProductForm) ---
  const [imageMode, setImageMode] = useState<ImageMode>("url");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const watchedImageUrl = watch("imageUrl");
  const watchedPrice = watch("price");
  const watchedOriginalPrice = watch("originalPrice");
  const watchedDiscountText = watch("discountText");
  const originalImageUrl = useRef<string | null>(
    defaultValues?.imageUrl ?? null,
  );
  const isFirstRender = useRef(true);

  useEffect(() => {
    const priceNumber = Number(watchedPrice);
    const originalNumber = Number(watchedOriginalPrice);

    const computedDiscount =
      !Number.isNaN(priceNumber) &&
      !Number.isNaN(originalNumber) &&
      originalNumber > 0 &&
      priceNumber > 0 &&
      originalNumber > priceNumber
        ? `${Math.round(((originalNumber - priceNumber) / originalNumber) * 100)}% OFF`
        : "";

    if (computedDiscount !== watchedDiscountText) {
      setValue("discountText", computedDiscount, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [watchedPrice, watchedOriginalPrice, watchedDiscountText, setValue]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (imageMode === "upload") {
      setValue("imageUrl", "", { shouldValidate: true });
    }

    if (imageMode === "url") {
      if (originalImageUrl.current) {
        setValue("imageUrl", originalImageUrl.current, {
          shouldValidate: true,
        });
      }
    }
    setPreview(null);
    setImageFile(null);
  }, [imageMode, setValue]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  const selectedLinkType = watch("linkType");

  // --- EXACT DB INSERTION & UPLOAD LOGIC FROM PRODUCT FORM ---
  function onSubmit(values: BannerPayload) {
    startTransition(async () => {
      try {
        let finalImageUrl = values.imageUrl ?? "";

        // Only upload if user chose upload mode
        if (imageMode === "upload") {
          if (!imageFile) {
            throw new Error("Image is required");
          }
          // Utilize your exact cloud upload function here!
          finalImageUrl = await uploadProductImage(imageFile);

          console.log("Uploading via uploadProductImage...", imageFile);
        }

        const payload = {
          ...values,
          imageUrl: finalImageUrl,
          productSlug: values.linkType === "product" ? values.productSlug : null,

          categoryId:
            values.linkType === "category" ? values.categoryHref : null,
        };

        if (mode === "edit" && bannerId) {
          await updateBanner(bannerId, payload);
          console.log("Updating Banner:", bannerId, payload);
        } else {
          await createBanner(payload);
          console.log("Creating Banner:", payload);
        }

        router.push("/admin/banners");
        router.refresh();
      } catch (error) {
        console.error("Submission failed:", error);
      }
    });
  }

  const liveData = watch();
  const displayImage = imageMode === "upload" ? preview : watchedImageUrl;
  const hasValidImage = imageMode === "url" ? !!watchedImageUrl : !!preview;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* FORM */}
      <div className="lg:col-span-12 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* IMAGE SELECTION LOGIC */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block font-dmsans_semibold text-[14px] text-gray-900">
                Banner Image <span className="text-red-500">*</span>
              </label>

              {/* URL vs Upload Toggle */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-dmsans_semibold rounded-md transition-all ${
                    imageMode === "url"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" /> URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-dmsans_semibold rounded-md transition-all ${
                    imageMode === "upload"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" /> Upload
                </button>
              </div>
            </div>

            {imageMode === "url" ? (
              <input
                type="url"
                {...register("imageUrl", { required: imageMode === "url" })}
                placeholder="https://example.com/banner.jpg"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all"
              />
            ) : (
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-[#0c831f]/50 transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-[#0c831f]" />
                </div>
                <p className="font-dmsans_semibold text-[14px] text-gray-700">
                  {imageFile ? imageFile.name : "Click or drag image to upload"}
                </p>
                {!imageFile && (
                  <p className="font-dmsans_light text-[12px] text-gray-500 mt-1">
                    Recommended size: 1400x400px (JPG, PNG, WebP)
                  </p>
                )}
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* BASIC CONTENT SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block font-dmsans_semibold text-[14px] text-gray-900 mb-1.5">
                Main Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { required: true })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-dmsans_semibold text-[14px] text-gray-900 mb-1.5">
                Subtitle
              </label>
              <input
                {...register("subtitle")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-dmsans_semibold text-[14px] text-gray-900 mb-1.5">
                Top Badge Text
              </label>
              <input
                {...register("badge")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all"
              />
            </div>

            <div>
              <label className="block font-dmsans_semibold text-[14px] text-gray-900 mb-1.5">
                Button Text (CTA) <span className="text-red-500">*</span>
              </label>
              <input
                {...register("cta", { required: true })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all"
              />
            </div>

            {/* Link Type */}
            <div>
              <label className="block font-dmsans_semibold text-[14px] text-gray-900 mb-1.5">
                Banner Link Type <span className="text-red-500">*</span>
              </label>

              <select
                {...register("linkType", { required: true })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all bg-white"
              >
                <option value="">Select Link Type</option>
                <option value="product">Product</option>
                <option value="category">Category</option>
              </select>
            </div>

            {/* Product Dropdown */}
            {selectedLinkType === "product" && (
              <div>
                <label className="block font-dmsans_semibold text-[14px] text-gray-900 mb-1.5">
                  Select Product <span className="text-red-500">*</span>
                </label>

                <select
                  {...register("productSlug", {
                    required: selectedLinkType === "product",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all bg-white"
                >
                  <option value="">Select Product</option>

                  {products?.map((product) => (
                    <option key={product.id} value={product.slug}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Category Dropdown */}
            {selectedLinkType === "category" && (
              <div>
                <label className="block font-dmsans_semibold text-[14px] text-gray-900 mb-1.5">
                  Select Category <span className="text-red-500">*</span>
                </label>

                <select
                  {...register("categoryHref", {
                    required: selectedLinkType === "category",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all bg-white"
                >
                  <option value="">Select Category</option>

                  {CATEGORIES.map((category) => (
                    <option key={category.href} value={category.href}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* PRICING SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block font-dmsans_semibold text-[14px] text-gray-900 mb-1.5">
                Offer Price (₹)
              </label>
              <input
                type="number"
                {...register("price")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0c831f] text-[14px] font-dmsans_light"
              />
            </div>
            <div>
              <label className="block font-dmsans_semibold text-[14px] text-gray-900 mb-1.5">
                Original (₹)
              </label>
              <input
                type="number"
                {...register("originalPrice")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0c831f] text-[14px] font-dmsans_light"
              />
            </div>
            <div>
              <label className="block font-dmsans_semibold text-[14px] text-gray-900 mb-1.5">
                Discount Tag
              </label>
              <input
                {...register("discountText")}
                value={watchedDiscountText ?? ""}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-[14px] font-dmsans_light text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="pt-4 flex flex-col gap-3">
            <div className="hidden sm:flex sm:items-center sm:justify-between gap-3">
              <button
                type="button"
                onClick={() => setOpenPreview(true)}
                className="h-10 px-4 rounded-xl font-dmsans_semibold bg-black text-white text-sm hover:bg-gray-900 transition-colors"
              >
                See Preview
              </button>

              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-dmsans_semibold text-[14px] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending || !isValid || !hasValidImage}
                  className="flex items-center justify-center gap-2 px-8 py-2.5 bg-[#0c831f] text-white rounded-xl hover:bg-[#0a6c19] transition-all font-dmsans_semibold text-[14px] disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {mode === "edit" ? "Update Banner" : "Publish Banner"}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:hidden gap-3">
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-dmsans_semibold text-[14px] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending || !isValid || !hasValidImage}
                  className="w-full flex items-center justify-center gap-2 px-8 py-2.5 bg-[#0c831f] text-white rounded-xl hover:bg-[#0a6c19] transition-all font-dmsans_semibold text-[14px] disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {mode === "edit" ? "Update Banner" : "Publish Banner"}
                </button>
              </div>
            </div>
          </div>
        </form>
        <button
          type="button"
          onClick={() => setOpenPreview(true)}
          className="sm:hidden fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-2xl transition hover:bg-gray-900"
          aria-label="See preview"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>

      {/* <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-2">
  <div className="w-full aspect-[16/9] rounded-xl overflow-hidden relative bg-gray-100">
    {displayImage ? (
      <BannerSlide
        isPreview
        title={liveData.title}
        subtitle={liveData.subtitle}
        badge={liveData.badge}
        cta={liveData.cta || "Shop Now"}
        linkUrl={liveData.linkUrl || "#"}
        price={liveData.price ? Number(liveData.price) : undefined}
        originalPrice={
          liveData.originalPrice
            ? Number(liveData.originalPrice)
            : undefined
        }
        discountText={liveData.discountText}
        imageUrl={displayImage}
        colors={{
          text: "text-gray-900",
          subText: "text-gray-700",
          badgeBg: "bg-black/10",
          badgeText: "text-gray-900",
          ctaBg: "bg-[#0c831f]",
          ctaText: "text-white",
        }}
      />
    ) : (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
        <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
        <p className="font-dmsans_light text-[13px]">
          Upload or enter URL to see preview
        </p>
      </div>
    )}
  </div>
</div> */}

      {openPreview && (
        <div
          className="
      fixed inset-0 z-[9999]
      bg-black/70 backdrop-blur-sm
      flex items-center justify-center
      p-4
      animate-in fade-in duration-200
    "
        >
          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={() => setOpenPreview(false)}
            className="
        absolute top-4 right-4
        w-10 h-10
        rounded-full
        bg-white/10
        border border-white/10
        text-white
        flex items-center justify-center
        hover:bg-white/20
        transition-colors
      "
          >
            <X className="w-5 h-5" />
          </button>

          {/* MODAL CONTENT */}
          <div
            className="
        w-full
        max-w-7xl
        rounded-[28px]
        overflow-hidden
        shadow-2xl
        bg-white
      "
          >
            {displayImage ? (
              <div
                className="
            relative
            w-full
            aspect-[16/6]

            min-h-[320px]
            sm:min-h-[400px]
            lg:min-h-[500px]
            xl:min-h-[580px]
          "
              >
                <BannerSlide
                  isPreview={true}
                  title={liveData.title}
                  subtitle={liveData.subtitle}
                  badge={liveData.badge}
                  cta={liveData.cta || "Shop Now"}
                  linkUrl={liveData.linkUrl || "#"}
                  price={liveData.price ? Number(liveData.price) : undefined}
                  originalPrice={
                    liveData.originalPrice
                      ? Number(liveData.originalPrice)
                      : undefined
                  }
                  discountText={watchedDiscountText}
                  imageUrl={displayImage}
                  colors={{
                    text: "text-gray-900",
                    subText: "text-gray-700",
                    badgeBg: "bg-black/10",
                    badgeText: "text-gray-900",
                    ctaBg: "bg-zinc-900",
                    ctaText: "text-white",
                  }}
                />
              </div>
            ) : (
              <div
                className="
            h-[400px]
            flex flex-col items-center justify-center
            text-gray-400
          "
              >
                <ImageIcon className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-sm">Upload or enter image URL first</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
