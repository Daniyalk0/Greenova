"use client";
import { usePathname } from "next/navigation";


const DiscountedPrice = ({ product, className }: { product: any, className?: string }) => {
  const discountPercent = product.discount ?? 0;

  const discountedPrice = Math.round(
    product.price - (product.price * discountPercent) / 100
  );

  const hasDiscount = discountPercent > 0;

  const pathname = usePathname();
  
  // Check if the route starts with /products/
  const isProductPage = pathname.startsWith("/products/");

  return (
    <div className="flex items-center gap-2 font-monasans_semibold">
 <span 
  className={`text-md ${className} ${
    isProductPage 
      ? "text-[#024418] font-bold" 
      : "text-gray-900"
  }`}
>
  ₹{discountedPrice}
</span>

      {hasDiscount && (
        <>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.price}
          </span>
          {/* <span className="text-xs font-semibold text-green-600">
            {discountPercent}% OFF
          </span> */}
        </>
      )}
    </div>
  );
};

export default DiscountedPrice;
