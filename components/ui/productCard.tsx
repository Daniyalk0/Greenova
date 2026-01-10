"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import QuantitySelect from "./QuantitySelect"
import { addToCart, getCart } from "@/lib/cartUtils"
import { useSession } from "next-auth/react"
import { getCartItemsFromSupabase, removeCartItem, syncLocalCartToSupabase } from "@/src/app/actions/cart"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/src/store/store"
import { fetchCartProducts, setLocalCart } from "@/src/store/cartProductsSlice"
import { addToWishlist, removeWishlistItem } from "@/src/app/actions/like"
import { fetchWishlistProducts, setLocalWishlist } from "@/src/store/wishListSlice"
import { toggleWishlistUtil } from "@/lib/wishlistUtils"
import { addToCartUtil } from "@/lib/addToCartUtil"
import Link from "next/link"
import DiscountedPrice from "../DiscountedPrice"
import { toast } from "react-toastify";

type Option = {
  weight: number
  price: number
}

type ProductCardProps = {
  options?: Option[]   // 👈 fix here
  // product: Product
  cart: any[]
  product: any
  wishlist: any[]
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
  // img = "/apple.png"
  // cart,
  wishlist

}: ProductCardProps) => {

  const cart = useSelector((state: RootState) => state.cartProducts.items);
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


  // const handleAddToCart = () =>
  //   addToCartUtil({
  //     product,
  //     weight: selectedWeightPrice.weight,
  //     cart,
  //     session,
  //     dispatch,
  //     setLocalCart,
  //     syncLocalCartToSupabase,
  //     fetchCartProducts,
  //     addToCart,
  //     getCart,
  //   });

  const handleAddToCart = async () => {
    const result = await addToCartUtil({
      product,
      weight: selectedWeightPrice.weight,
      cart,
      session,
      dispatch,
      setLocalCart,
      syncLocalCartToSupabase,
      fetchCartProducts,
      addToCart,
      getCart,
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
      setLocalWishlist,
      fetchWishlistProducts,
      addToWishlist,
      removeWishlistItem,
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

    return (

      <div
        className="
    relative w-full bg-white rounded-xl
    shadow-sm hover:shadow-md transition
    px-3 pt-3 pb-4 cursor-pointer
  "
      >
        {/* Wishlist Icon */}
        <button
          onClick={handleToggleWishlist}
          className="
      absolute top-2 right-2 z-10
      p-1.5 rounded-full bg-white
      shadow border
      hover:scale-105 transition
    "
        >
          <Heart
            className={`w-4 h-4 ${isInWishlist ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
          />
        </button>

        {/* Product Image */}
        <Link href={`/products/${product.slug}`}>
          <div className="flex justify-center items-center h-[90px]">
            <Image
              src={product?.imageUrl || "/100.png"}
              alt={product?.name || "product"}
              width={90}
              height={90}
              className="object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="mt-2">
            <h3 className="text-sm font-monasans_semibold text-gray-800 truncate">
              {product?.name}
            </h3>
            <p className="text-[11px] text-gray-500 font-dmsans_light">
              Seasonal Special
            </p>
          </div>
        </Link>
        {/* Quantity Selector */}
        <div className="mt-2">
          <QuantitySelect
            options={options}
            onSelect={(opt) => setSelectedWeightPrice(opt)}
          />
        </div>

        {/* Price + CTA */}
        <div className="mt-3 flex items-center justify-between gap-2">
          {/* Price */}
          <DiscountedPrice product={product} />

          {/* Cart CTA */}
          {isInCart ? (
            <Link
              href="/cart"
              className="
          flex items-center justify-center gap-1
          px-3 py-1.5
          text-[11px] rounded-md
          bg-blue-600 text-white
          hover:bg-blue-700
          active:scale-[0.96]
        "
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline font-dmsans_light">Go to Cart</span>
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              className="
          flex items-center justify-center gap-1
          px-3 py-1.5
          text-[11px] rounded-md
          bg-green-600 text-white
          hover:bg-green-700
          active:scale-[0.96]
        "
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline font-dmsans_light">Add</span>
            </button>
          )}
        </div>
      </div >

    )
  }

  export default ProductCard
