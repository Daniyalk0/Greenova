"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { CalendarOff, Heart, ShoppingCart } from "lucide-react"
import QuantitySelect from "./QuantitySelect"
import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/src/store/store"
import { toggleWishlistUtil } from "@/lib/wishlistUtils"
import { addToCartUtil } from "@/lib/addToCartUtil"
import Link from "next/link"
import DiscountedPrice from "../DiscountedPrice"
import { toast } from "react-toastify";
import { cn } from "@/lib/utils"

type Option = {
  weight: number
  price: number
}

type ProductCardProps = {
  options?: Option[]   // 👈 fix here
  // product: Product
  cart?: any[]
  product: any
  wishlist?: any[]
  highlight?: boolean
  enableSeasonHighlight?: boolean;

}

type SelectedWeightPrice = {
  weight: number;
  price: number;
}

const ProductCard = ({
  // name = "Fresh Mangoes",
  // price = 120,
  options = [],
  product,
  highlight = false,
  enableSeasonHighlight

}: ProductCardProps) => {

  const cart = useSelector((state: RootState) => state.cartProducts.items);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const [localProducts, setLocalProducts] = useState(cart || []);
  // const [wishList, setwishList] = useState(wishlist || [])
  const { data: session } = useSession()


  useEffect(() => {
    if (Array.isArray(cart)) {
      setLocalProducts(cart);

    }
  }, [cart, session]);


  // const { data: session } = useSession()
  const defaultOption = options.find(opt => opt.weight === 1) || options[0]

  const [selectedWeightPrice, setSelectedWeightPrice] = useState<SelectedWeightPrice>(defaultOption);

  const dispatch = useDispatch<AppDispatch>();

  const isInCart = cart?.some(item => item?.productId === product.id);


  const handleAddToCart = async () => {

    const result = await addToCartUtil({
      product,
      weight: selectedWeightPrice.weight,
      cart : cart ?? [],
      session,
      dispatch,
      onOptimisticAdd: (msg) => {
        toast.dismiss();
        toast.success(msg, { autoClose: 2000 });
      },
    });

    if (!result) return;

    switch (result.type) {
      case "already-exists":
        toast.info(result.message);
        break;

      case "error":
        toast.error(result.message);
        break;

      case "local-added":
        toast.success(result.message);
        break;

      // "added" is optional here because optimistic toast already fired
      default:
        break;
    }
  };

  const isInWishlist = wishlist?.some(item => item.productId === product.id);

  const handleToggleWishlist = async () => {
    const result = await toggleWishlistUtil({
      product,
      wishlist,
      session,
      dispatch,
      onOptimisticAdd: (msg) => {
        toast.dismiss();
        toast.success(msg, { autoClose: 2000 });
      },
    });
    if (!result) return;

    switch (result.type) {
      case "error":
        toast.error(result.message);
        break;
      // "added" is optional here because optimistic toast already fired
      default:
        break;
    }
  }

  console.log("enableSeasonHighlight:", enableSeasonHighlight);
  console.log("highlight:", highlight);

    const isOffSeason = enableSeasonHighlight && !highlight;

  return (

       <div
      className={cn(
        "relative w-full bg-white rounded-2xl border border-gray-100 px-4 pt-4 pb-5 transition-all duration-300",
        isOffSeason 
          ? "opacity-60 grayscale-[20%] pointer-events-none" // Dims the card and disables ALL clicks inside it
          : "hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-[#0c831f]/20 cursor-pointer shadow-sm"
      )}
    >
      {/* Seasonal Badge (Only shows if item is ON season) */}
      {enableSeasonHighlight && highlight && product?.season && product.season.toLowerCase() !== "all" && (
        <span className="absolute top-3 left-3 bg-[#0c831f]/10 text-[#0c831f] border border-[#0c831f]/20 text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-dmsans_semibold z-10">
          {product.season}
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        disabled={isOffSeason}
        className="absolute top-2 right-2 group w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 z-10"
        aria-label="Add to wishlist"
      >
        <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:bg-red-50 group-active:scale-90" />
        <Heart
          size={18}
          className={`relative z-10 transition-colors duration-300 ${
            isInWishlist
              ? "fill-red-500 text-red-500"
              : "text-gray-400 group-hover:text-red-500"
          }`}
        />
      </button>

      {/* Product Image Wrapper with specific Image Overlay */}
      <Link 
        href={`/products/${product?.slug || "#"}`}
        tabIndex={isOffSeason ? -1 : 0} // Prevents tabbing to the link if off-season
      >
        <div className="relative flex justify-center items-center h-[110px] mt-4 mb-3 rounded-xl overflow-hidden">
          <Image
            src={product?.imageUrl || "/100.png"}
            alt={product?.name || "product"}
            width={100}
            height={100}
            className={cn(
              "object-contain transition-transform duration-300",
              !isOffSeason && "hover:scale-105 drop-shadow-sm"
            )}
          />

          {/* Frosted Glass Overlay - ONLY over the image! */}
          {isOffSeason && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-10">
              <div className="bg-gray-900/80 text-white text-[11px] font-dmsans_semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <CalendarOff className="w-3.5 h-3.5" />
                Out of Season
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-2 text-center sm:text-left">
          <h3 className="text-[14px] sm:text-[15px] font-dmsans_semibold text-gray-900 truncate">
            {product?.name || "Unknown Product"}
          </h3>
          <p className="text-[12px] text-gray-500 font-dmsans_light mt-0.5 truncate">
            {isOffSeason ? "Currently unavailable" : "Seasonal Special"}
          </p>
        </div>
      </Link>

      {/* Quantity Selector - Now perfectly visible but unclickable! */}
      <div className="mt-4">
        <QuantitySelect
          options={options}
          onSelect={(opt: any) => setSelectedWeightPrice(opt)}
        />
      </div>

      {/* Price + CTA */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex-1">
          <DiscountedPrice product={product} />
        </div>

        {/* Cart CTA */}
        {isInCart ? (
          <div className="flex items-center justify-center gap-1.5 px-4 py-2 text-[12px] rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline font-dmsans_semibold">In Cart</span>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isOffSeason}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-[12px] rounded-xl bg-[#0c831f] text-white transition-all active:scale-95 disabled:bg-gray-300 disabled:text-gray-500 disabled:active:scale-100"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline font-dmsans_semibold">Add</span>
          </button>
        )}
      </div>

    </div>

  )
}

export default ProductCard
