"use client"
import { Category } from '@prisma/client';
import React, { startTransition, useEffect, useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { createProduct, updateProduct, uploadProductImage } from '../actions';
import Image from 'next/image';
import { LinkIcon, Loader2, Upload, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


type ImageMode = "url" | "upload";

export type SubCategory =
  | "freshFruits"
  | "exoticFruits"
  | "dryFruits"
  | "leafyGreens"
  | "rootVegetables"
  | "herbs"
  | "organicVegetables";



export type ProductFormValues = {
  name: string;
  slug: string;
  subCategory?: SubCategory;
  imageUrl: string;
  description?: string;

  basePricePerKg: number;
  availableWeights: number[]; // matches Prisma Float[]


  calories?: number;
  fat?: number;
  sugar?: number;
  carbohydrates?: number;
  protein?: number;

  discount?: number;
  rating?: number;

  inStock: boolean;
  isActive: boolean;
  isFeatured: boolean;

  season: "ALL" | "SUMMER" | "WINTER" | "MONSOON";
  category: Category | "";
};

type ProductFormProps = {
  defaultValues?: ProductFormValues;
  // onSubmit: (data: ProductFormValues) => Promise<void>;
  submitLabel?: string;
  productId?: number; // for edit form to know which product to update
  mode: "create" | "edit";
};


const ProductForm = ({ defaultValues, submitLabel, mode, productId }: ProductFormProps) => {
  const { register, control, handleSubmit, watch, setValue,  reset, formState: { errors } } = useForm<ProductFormValues>({
    defaultValues,
    
  });

  useEffect(() => {
  if (defaultValues) {
    reset(defaultValues);
  }
}, [defaultValues, reset]);

  const [imageMode, setImageMode] = useState<ImageMode>("url");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const watchedImageUrl = watch("imageUrl");
  const originalImageUrl = useRef<string | null>(
    defaultValues?.imageUrl ?? null
  );

  const router = useRouter();

const availableWeights = watch("availableWeights") ?? [];


  function handleFileChange(file: File) {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function onSubmit(values: ProductFormValues) {
    startTransition(async () => {
      let finalImageUrl = values.imageUrl ?? "";

      // Only upload if user chose upload mode
      if (imageMode === "upload") {
        if (!imageFile) {
          throw new Error("Image is required");
        }
        finalImageUrl = await uploadProductImage(imageFile);
      }

      const payload = {
        ...values,
        imageUrl: finalImageUrl,
      };

      if (mode === "edit" && productId) {
        await updateProduct(productId, payload);
           toast.success("Product Updated!");
    router.push("/admin/products"); 
      } else {
        await createProduct(payload);
           toast.success("Product created!");
    router.push("/admin/products"); 
      }
    });
  }


  const name = watch("name");

  useEffect(() => {
    if (!name) {
      setValue("slug", "", { shouldValidate: true });
      return;
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    setValue("slug", slug, { shouldValidate: true });
  }, [name, setValue]);


  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (imageMode === "upload") {
      setValue("imageUrl", "");
    }

    if (imageMode === "url") {
      if (originalImageUrl.current) {
        setValue("imageUrl", originalImageUrl.current);
      }

    }
    setPreview(null);
  }, [imageMode, setValue]);



  const [newWeight, setNewWeight] = useState("");


  const SUB_CATEGORIES: Record<Category, { label: string; value: SubCategory }[]> = {
    FRUITS: [
      { label: "Fresh Fruits", value: "freshFruits" },
      { label: "Exotic Fruits", value: "exoticFruits" },
      { label: "Dry Fruits", value: "dryFruits" },
    ],
    VEGETABLES: [
      { label: "Leafy Greens", value: "leafyGreens" },
      { label: "Root Vegetables", value: "rootVegetables" },
      { label: "Organic Vegetables", value: "organicVegetables" },
      { label: "Herbs", value: "herbs" },
    ],
  }


  const selectedCategory = watch("category");

return (
    <div className="min-h-screen bg-gray-50/50 py-4 sm:py-0 px-0 sm:px-6 lg:px-8 flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-200 space-y-8 sm:space-y-10"
      >
        {/* HEADER */}
        <div className="border-b border-gray-100 pb-5 sm:pb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-monasans_semibold text-gray-900 tracking-tight">
            {submitLabel || "Add New Product"}
          </h1>
          <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-sm text-gray-500 font-dmsans_light">
            Fill in the details below to create your product listing.
          </p>
        </div>

        {/* BASIC INFO SECTION */}
        <section className="space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2 border-l-4 border-[#0c831f] pl-3">
            <h2 className="text-lg sm:text-xl font-dmsans_semibold text-gray-800">
              Basic Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-1.5">
              <label className="text-[13px] sm:text-sm font-dmsans_semibold text-gray-700">
                Product Name
              </label>
              <input
                disabled={isPending}
                {...register("name", { required: true })}
                placeholder="e.g. Organic Red Apples"
                className="w-full px-4 py-2.5 sm:py-2 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#0c831f]/10 focus:border-[#0c831f] outline-none transition-all font-dmsans_light text-sm disabled:opacity-60 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] sm:text-sm font-dmsans_semibold text-gray-700">
                URL Slug
              </label>
              <input
                disabled={isPending}
                {...register("slug", { required: true })}
                placeholder="organic-red-apples"
                className="w-full px-4 py-2.5 sm:py-2 rounded-xl border border-gray-300 bg-gray-50 focus:ring-4 focus:ring-[#0c831f]/10 focus:border-[#0c831f] outline-none transition-all font-dmsans_light text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] sm:text-sm font-dmsans_semibold text-gray-700">
              Description
            </label>
            <textarea
              disabled={isPending}
              {...register("description")}
              placeholder="Describe the product's origin, taste, and quality..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#0c831f]/10 focus:border-[#0c831f] min-h-[100px] sm:min-h-[120px] outline-none transition-all text-sm font-dmsans_light disabled:opacity-60 disabled:bg-gray-100 disabled:cursor-not-allowed resize-y"
            />
          </div>

          {/* IMAGE SELECTION */}
          <div className="space-y-4 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-dashed border-gray-300">
            <label className="text-[11px] sm:text-xs font-dmsans_semibold text-gray-500 uppercase tracking-wider">
              Product Image
            </label>

            <div className="flex p-1 bg-gray-200/80 rounded-lg w-full sm:w-fit">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setImageMode("url")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-md text-[13px] sm:text-sm font-dmsans_semibold transition-all ${
                  imageMode === "url"
                    ? "bg-white shadow-sm text-[#0c831f]"
                    : "text-gray-600 hover:text-gray-800"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                <LinkIcon size={16} /> URL
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => setImageMode("upload")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-md text-[13px] sm:text-sm font-dmsans_semibold transition-all ${
                  imageMode === "upload"
                    ? "bg-white shadow-sm text-[#0c831f]"
                    : "text-gray-600 hover:text-gray-800"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                <Upload size={16} /> Upload
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start sm:items-center">
              <div className="space-y-3">
                {imageMode === "url" ? (
                  <input
                    type="url"
                    disabled={isPending}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 sm:py-2 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#0c831f]/10 focus:border-[#0c831f] outline-none text-sm disabled:opacity-60 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    {...register("imageUrl", { required: imageMode === "url" })}
                  />
                ) : (
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isPending}
                      onChange={(e) =>
                        e.target.files && handleFileChange(e.target.files[0])
                      }
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 sm:file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[13px] sm:file:text-sm file:font-dmsans_semibold file:bg-green-50 file:text-[#0c831f] hover:file:bg-green-100 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                )}
              </div>

              {/* Image Preview Container */}
              {(preview || watchedImageUrl) && (
                <div className="relative w-full h-40 sm:h-48 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
                  {imageMode === "url" ? (
                    <img
                      src={watchedImageUrl!}
                      alt="Preview"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <Image
                      src={preview!}
                      alt="Preview"
                      fill
                      className="object-contain p-2"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PRICING & WEIGHTS */}
        <section className="p-4 sm:p-6 bg-[#f4f8f5]/80 rounded-2xl border border-[#0c831f]/20 space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2 border-l-4 border-[#0c831f] pl-3">
            <h2 className="text-lg sm:text-xl font-dmsans_semibold text-gray-800">
              Pricing & Inventory
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-1.5">
              <label className="text-[13px] sm:text-sm font-dmsans_semibold text-gray-700">
                Base Price (per kg)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-dmsans_semibold">
                  ₹
                </span>
                <input
                  type="number"
                  step="0.01"
                  disabled={isPending}
                  {...register("basePricePerKg", { valueAsNumber: true })}
                  className="w-full pl-8 pr-4 py-2.5 sm:py-2 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#0c831f]/10 focus:border-[#0c831f] outline-none text-sm disabled:opacity-60 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] sm:text-sm font-dmsans_semibold text-gray-700">
                Discount (%)
              </label>
              <input
                type="number"
                disabled={isPending}
                {...register("discount", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 sm:py-2 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#0c831f]/10 focus:border-[#0c831f] outline-none text-sm disabled:opacity-60 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="0"
              />
            </div>
          </div>

          {/* Weights Section */}
          <div className="space-y-2.5 sm:space-y-3">
            <p className="text-[13px] sm:text-sm font-dmsans_semibold text-gray-700">
              Available Weights
            </p>
            <div className="flex flex-wrap gap-2 min-h-[48px] sm:min-h-[44px] p-2.5 sm:p-3 bg-white rounded-xl border border-gray-200">
              {availableWeights?.length > 0 ? (
                availableWeights.map((w, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1.5 bg-[#0c831f] text-white px-3 py-1 sm:py-1.5 rounded-lg text-[13px] sm:text-sm font-dmsans_semibold animate-in fade-in zoom-in duration-200"
                  >
                    {w} kg
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        setValue(
                          "availableWeights",
                          availableWeights.filter((weight) => weight !== w)
                        )
                      }
                      className="hover:bg-[#0a6c19] rounded-md p-0.5 transition-colors disabled:cursor-not-allowed"
                    >
                      <XIcon size={14} />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-[13px] sm:text-sm italic font-dmsans_light my-auto px-1">
                  No weights added yet...
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <input
                type="number"
                step="0.1"
                disabled={isPending}
                placeholder="Add kg (e.g. 0.5)"
                className="flex-1 px-4 py-2.5 sm:py-2 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#0c831f]/10 focus:border-[#0c831f] outline-none text-sm disabled:opacity-60 disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
              />
              <button
                type="button"
                disabled={isPending}
                className="px-6 py-2.5 sm:py-2 bg-gray-800 text-white rounded-xl font-dmsans_semibold text-[13px] sm:text-sm hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => {
                  const num = parseFloat(newWeight);
                  if (
                    !isNaN(num) &&
                    num > 0 &&
                    !availableWeights.includes(num)
                  ) {
                    setValue("availableWeights", [...availableWeights, num]);
                  }
                  setNewWeight("");
                }}
              >
                Add Weight
              </button>
            </div>
            {errors.availableWeights && (
              <p className="text-red-500 text-[12px] font-dmsans_semibold mt-1">
                Please add at least one weight option.
              </p>
            )}
          </div>
        </section>

        {/* NUTRITION ACCORDION */}
        <section className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <details className="group">
            <summary className="flex items-center justify-between p-4 sm:p-5 bg-gray-50/50 cursor-pointer list-none hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-dmsans_semibold text-[15px] sm:text-base text-gray-800">
                  Nutrition Facts
                </span>
                <span className="text-[12px] sm:text-xs text-gray-500 font-dmsans_light">
                  (per 100g - optional)
                </span>
              </div>
              <div className="text-gray-400 group-open:rotate-180 transition-transform">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </summary>

            <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 border-t border-gray-100">
              {[
                { label: "Calories", name: "calories", unit: "kcal" },
                { label: "Fat", name: "fat", unit: "g" },
                { label: "Sugar", name: "sugar", unit: "g" },
                { label: "Carbs", name: "carbohydrates", unit: "g" },
                { label: "Protein", name: "protein", unit: "g" },
              ].map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <label className="text-[11px] sm:text-xs font-dmsans_semibold text-gray-500 uppercase tracking-wider">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      disabled={isPending}
                      {...register(field.name as any, { valueAsNumber: true })}
                      className="w-full px-3 py-2.5 sm:py-2 rounded-xl border border-gray-200 focus:ring-4 focus:ring-[#0c831f]/10 focus:border-[#0c831f] outline-none text-[13px] sm:text-sm disabled:opacity-60 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] sm:text-xs text-gray-400 font-dmsans_light">
                      {field.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </section>

        {/* META & CATEGORY */}
        <section className="space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2 border-l-4 border-[#0c831f] pl-3">
            <h2 className="text-lg sm:text-xl font-dmsans_semibold text-gray-800">
              Classification
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="space-y-1.5">
              <label className="text-[13px] sm:text-sm font-dmsans_semibold text-gray-700">
                Season
              </label>
              <select
                disabled={isPending}
                {...register("season")}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#0c831f]/10 focus:border-[#0c831f] bg-white outline-none font-dmsans_light text-sm disabled:opacity-60 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none"
              >
                <option value="ALL">All Seasons</option>
                <option value="SUMMER">Summer</option>
                <option value="WINTER">Winter</option>
                <option value="MONSOON">Monsoon</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] sm:text-sm font-dmsans_semibold text-gray-700">
                Category
              </label>
              <select
                disabled={isPending}
                {...register("category")}
                onChange={(e) => {
                  setValue("category", e.target.value as any);
                  setValue("subCategory", undefined as any);
                }}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#0c831f]/10 focus:border-[#0c831f] bg-white outline-none font-dmsans_light text-sm disabled:opacity-60 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none"
              >
                <option value="">Select category</option>
                <option value="FRUITS">Fruits</option>
                <option value="VEGETABLES">Vegetables</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] sm:text-sm font-dmsans_semibold text-gray-700">
                Sub-Category
              </label>
              <select
                disabled={isPending || !selectedCategory}
                {...register("subCategory", { required: true })}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#0c831f]/10 focus:border-[#0c831f] bg-white disabled:bg-gray-100 outline-none font-dmsans_light text-sm disabled:opacity-60 disabled:cursor-not-allowed appearance-none"
              >
                <option value="">Select SubCategory</option>
                {selectedCategory &&
                  SUB_CATEGORIES[selectedCategory]?.map((sub) => (
                    <option key={sub.value} value={sub.value}>
                      {sub.label}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Status Checkboxes */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 p-4 sm:p-5 bg-gray-50/80 rounded-2xl border border-gray-200">
            {[
              { name: "inStock", label: "In Stock" },
              { name: "isActive", label: "Visible on Site" },
              { name: "isFeatured", label: "Featured Product" },
            ].map((box) => (
              <label
                key={box.name}
                className={`flex items-center gap-3 cursor-pointer group ${
                  isPending ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  disabled={isPending}
                  {...register(box.name as any)}
                  className="w-5 h-5 rounded border-gray-300 text-[#0c831f] focus:ring-[#0c831f] disabled:cursor-not-allowed"
                />
                <span className="text-[13px] sm:text-sm font-dmsans_semibold text-gray-700 group-hover:text-[#0c831f] transition-colors">
                  {box.label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* SUBMIT BUTTON */}
        <div className="pt-4 sm:pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto px-10 py-3.5 sm:py-4 bg-[#0c831f] text-white rounded-xl shadow-md hover:bg-[#0a6c19] hover:shadow-lg transition-all active:scale-[0.98] font-dmsans_semibold text-[15px] sm:text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
          >
            {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
            {isPending
              ? "Saving..."
              : submitLabel || "Save Product Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;