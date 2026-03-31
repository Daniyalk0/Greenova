"use client"
import { Category } from '@prisma/client';
import React, { startTransition, useEffect, useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { createProduct, updateProduct, uploadProductImage } from '../actions';
import Image from 'next/image';
import { LinkIcon, Upload, XIcon } from 'lucide-react';


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
      } else {
        await createProduct(payload);
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-4">
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="max-w-4xl  space-y-8 bg-white p-0 rounded-xl shadow-sm border border-gray-100"
    >
      {/* HEADER */}
      <div className="border-b border-gray-100 pb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-monasans_semibold">
          {submitLabel || "Add New Product"}
        </h1>
        <p className="mt-2 text-sm text-gray-500 font-dmsans_light">Fill in the details below to create your product listing.</p>
      </div>

      {/* BASIC INFO SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-l-4 border-green-600 pl-3">
          <h2 className="font-bold text-xl text-gray-800 font-dmsans_semibold">Basic Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 font-dmsans_semibold">Product Name</label>
            <input 
              {...register("name", { required: true })} 
              placeholder="e.g. Organic Red Apples" 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-dmsans_light" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 font-dmsans_semibold">URL Slug</label>
            <input 
              {...register("slug", { required: true })} 
              placeholder="organic-red-apples" 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition-all font-dmsans_light" 
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 font-dmsans_semibold">Description</label>
          <textarea 
            {...register("description")} 
            placeholder="Describe the product's origin, taste, and quality..." 
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 min-h-[120px] outline-none transition-all" 
          />
        </div>

        {/* IMAGE SELECTION */}
        <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider font-dmsans_semibold">Product Image</label>
          
          <div className="flex p-1 bg-gray-200 rounded-lg w-fit">
            <button
              type="button"
              onClick={() => setImageMode("url")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${imageMode === "url" ? "bg-white shadow-sm text-green-600" : "text-gray-600 hover:text-gray-800"} font-dmsans_semibold`}
            >
              <LinkIcon size={16} /> URL
            </button>
            <button
              type="button"
              onClick={() => setImageMode("upload")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${imageMode === "upload" ? "bg-white shadow-sm text-green-600" : "text-gray-600 hover:text-gray-800"} font-dmsans_semibold`}
            >
              <Upload size={16} /> Upload
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              {imageMode === "url" ? (
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                  {...register("imageUrl", { required: imageMode === "url" })}
                />
              ) : (
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer font-dmsans_semibold"
                  />
                </div>
              )}
            </div>

            {/* Image Preview Container */}
            {(preview || watchedImageUrl) && (
              <div className="relative w-full h-40 md:h-48 bg-white border rounded-xl overflow-hidden shadow-inner group font-dmsans_semibold">
                {imageMode === "url" ? (
                  <img
                    src={watchedImageUrl!}
                    alt="Preview"
                    className="w-full h-full object-contain"
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
      <section className="p-6 bg-green-50/50 rounded-2xl border border-green-100 space-y-6">
        <div className="flex items-center gap-2 border-l-4 border-green-600 pl-3">
          <h2 className="font-bold text-xl text-gray-800 font-dmsans_semibold">Pricing & Inventory</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 font-dmsans_semibold">Base Price (per kg)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400 font-dmsans_semibold">$</span>
              <input
                type="number"
                step="0.01"
                {...register("basePricePerKg", { valueAsNumber: true })}
                className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 font-dmsans_semibold">Discount (%)</label>
            <input
              type="number"
              {...register("discount", { valueAsNumber: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="0"
            />
          </div>
        </div>

        {/* Weights Section */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700 font-dmsans_semibold">Available Weights</p>
          <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-white rounded-lg border border-gray-200">
            {availableWeights?.length > 0 ? (
              availableWeights.map((w, idx) => (
                <span key={idx} className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-in fade-in zoom-in duration-200 font-dmsans_semibold">
                  {w} kg
                  <button 
                    type="button"
                    onClick={() => setValue("availableWeights", availableWeights.filter((weight) => weight !== w))}
                    className="hover:bg-green-700 rounded-full p-0.5"
                  >
                    <XIcon size={14} />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm italic font-dmsans_semibold">No weights added yet...</span>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              placeholder="Add kg (e.g. 0.5)"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
            />
            <button
              type="button"
              className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors font-dmsans_semibold"
              onClick={() => {
                const num = parseFloat(newWeight);
                if (!isNaN(num) && num > 0 && !availableWeights.includes(num)) {
                  setValue("availableWeights", [...availableWeights, num]);
                }
                setNewWeight("");
              }}
            >
              Add
            </button>
          </div>
          {errors.availableWeights && (
            <p className="text-red-500 text-xs font-medium italic font-dmsans_semibold">Please add at least one weight option.</p>
          )}
        </div>
      </section>

      {/* NUTRITION ACCORDION */}
      <section className="border border-gray-200 rounded-xl overflow-hidden">
        <details className="group">
          <summary className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer list-none hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-2 font-dmsans_semibold">
              <span className="font-bold text-gray-800 ">Nutrition Facts</span>
              <span className="text-xs text-gray-500 font-normal">(per 100g - optional)</span>
            </div>
            <div className="text-gray-400 group-open:rotate-180 transition-transform font-dmsans_semibold">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </summary>

          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 bg-white font-dmsans_semibold">
            {[
              { label: 'Calories', name: 'calories', unit: 'kcal' },
              { label: 'Fat', name: 'fat', unit: 'g' },
              { label: 'Sugar', name: 'sugar', unit: 'g' },
              { label: 'Carbs', name: 'carbohydrates', unit: 'g' },
              { label: 'Protein', name: 'protein', unit: 'g' },
            ].map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">{field.label}</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    {...register(field.name as any, { valueAsNumber: true })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none text-sm"
                  />
                  <span className="absolute right-2 top-2 text-[10px] text-gray-400">{field.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </details>
      </section>

      {/* META & CATEGORY */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-l-4 border-green-600 pl-3">
          <h2 className="font-bold text-xl text-gray-800 font-dmsans_semibold">Classification</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-dmsans_semibold">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Season</label>
            <select {...register("season")} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 bg-white outline-none font-dmsans_light">
              <option value="ALL">All Seasons</option>
              <option value="SUMMER">Summer</option>
              <option value="WINTER">Winter</option>
              <option value="MONSOON">Monsoon</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 font-dmsans_semibold">Category</label>
            <select 
              {...register("category")} 
              onChange={(e) => {
                setValue("category", e.target.value as any);
                setValue("subCategory", undefined as any);
              }} 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 bg-white outline-none font-dmsans_light"
            >
              <option value="">Select category</option>
              <option value="FRUITS">Fruits</option>
              <option value="VEGETABLES">Vegetables</option>
            </select>
          </div>

          <div className="space-y-1 ">
            <label className="text-sm font-medium text-gray-700 font-dmsans_semibold">Sub-Category</label>
            <select 
              {...register("subCategory", { required: true })} 
              disabled={!selectedCategory} 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 bg-white disabled:bg-gray-100 outline-none font-dmsans_light"
            >
              <option value="">Select SubCategory</option>
              {selectedCategory && SUB_CATEGORIES[selectedCategory]?.map((sub) => (
                <option key={sub.value} value={sub.value}>{sub.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Checkboxes */}
        <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" {...register("inStock")} className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors font-dmsans_semibold">In Stock</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" {...register("isActive")} className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors font-dmsans_semibold">Visible on Site</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" {...register("isFeatured")} className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors font-dmsans_semibold">Featured Product</span>
          </label>
        </div>
      </section>

      {/* SUBMIT BUTTON */}
      <div className="pt-6 border-t border-gray-100">
        <button className="w-full md:w-auto px-10 py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 hover:scale-[1.01] transition-all active:scale-[0.98] font-dmsans_semibold">
          {submitLabel || "Save Product Listing"}
        </button>
      </div>
    </form>
  </div>
  )
}

export default ProductForm