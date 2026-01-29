// app/products/[slug]/page.tsx


import DiscountedPrice from "@/components/DiscountedPrice";
import ProductAddToCart from "@/components/productsDetails/ProductAddToCart";
import ProductWishlist from "@/components/productsDetails/ProductWishlist";
import Heading from "@/components/ui/Heading";
import Nutrition from "@/components/ui/Nutrition";
import ProductImage from "@/components/ui/ZoomableImage";
import { getProductBySlug } from "@/lib/products";
import { Star } from "lucide-react";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
 <div className="px-3 sm:px-6 lg:px-20 py-4 sm:py-6 md:mt-10">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">

    {/* LEFT: Image */}
    <div className="relative">
      <div className="bg-white rounded-2xl p-2 shadow-sm relative">
        {/* <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full aspect-square object-contain"
        /> */}
        <ProductImage src={product.imageUrl} />

        {/* Wishlist */}
        <div className="absolute top-3 right-3">
          <ProductWishlist product={product} />
        </div>
      </div>
    </div>

    {/* RIGHT: Content + Details + Add to Cart */}
    <div className="flex flex-col gap-4 ">

      {/* Basic info */}
      <div className="flex flex-col gap-2">

      <h1 className="text-[1.7rem] sm:text-[3rem] font-dmsans_semibold text-center w-fit text-[#024418] ">
        {product.name}
      </h1>
     {/* <Heading text={product.name} className="!font-dmsans_semibold text-3xl w-fit text-[#024418]" notationType={"box"} color="#035E22" /> */}

      <p className="text-[#024418] text-sm leading-relaxed font-dmsans_light md:text-lg">
        {product.description}
      </p>
      </div>

      {/* <p className="text-lg sm:text-xl font-bold text-gray-900 font-dmsans_semibold">
        ₹{product.price}
      </p> */}
      <DiscountedPrice product={product} className="text-xl sm:text-2xl lg:text-3xl"/>

          <div className="pt-2 md:pt-0">
        <ProductAddToCart product={product} />
      </div>

      {/* PRODUCT DETAILS */}
   {/* PRODUCT INFO */}
<div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">

  {/* Rating + Stock */}
  <div className="flex items-center justify-between text-sm">
   <div className="flex items-center gap-1 text-green-600 font-dmsans_semibold">
      <Star fill="#FFE100" stroke="#4A4100" width={20} height={20} /> <span>{product.rating}</span>
    </div>
    <span
      className={`text-xs font-dmsans_light px-2 py-1 rounded-full
        ${product.inStock
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"}
      `}
    >
      {product.inStock ? "In Stock" : "Out of Stock"}
    </span>
  </div>

  {/* Quick Specs */}
  <div className="grid grid-cols-2 gap-x-8 gap-y-4  py-5 md:py-3 text-sm font-dmsans_light">
    <div className="flex justify-between">
      <span className="text-gray-500">Category</span>
      <span className="font-medium capitalize">
        {product.category}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">Type</span>
      <span className="font-medium capitalize">
        {product?.subCategory?.replace(/([A-Z])/g, " $1")}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">Base Price</span>
      <span className="font-medium">
        ₹{product.basePricePerKg}/kg
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">Discount</span>
      <span className="font-medium text-green-600">
        {product.discount}% off
      </span>
    </div>
  </div>

  {/* NUTRITION */}
  <div>
    <h3 className="text-sm font-semibold text-gray-900 mb-2 font-monasans_semibold">
      Nutritional Information (per 100g)
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-dmsans_light">
      <Nutrition label="Calories" value={`${product.calories} kcal`} />
      <Nutrition label="Carbs" value={`${product.carbohydrates} g`} />
      <Nutrition label="Sugar" value={`${product.sugar} g`} />
      <Nutrition label="Protein" value={`${product.protein} g`} />
      <Nutrition label="Fat" value={`${product.fat} g`} />
    </div>
  </div>
</div>


      {/* ADD TO CART */}
  
    </div>
  </div>
</div>



  );
}