// app/products/[slug]/ProductWishlist.tsx
"use client";

import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store/store";
import { useSession } from "next-auth/react";
import { fetchWishlistProducts, setLocalWishlist } from "@/src/store/wishListSlice";
import { addToWishlist, removeWishlistItem } from "@/src/app/actions/like";
import { toggleWishlistUtil } from "@/lib/wishlistUtils";

type Props = {
  product: any;
  onToggle?: (productId: string) => void; // 👈 your function
};

export default function ProductWishlist({ product, onToggle }: Props) {
  const wishlist = useSelector(
    (state: RootState) => state.wishlistProducts.items
  );

  const isWishlisted = wishlist.some(
    (item) => item.productId === product.id
  );

    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession()
  
   const handleToggleWishlist = () =>
      toggleWishlistUtil({
        product,
        wishlist,
        session,
        dispatch,
        setLocalWishlist,
        fetchWishlistProducts,
        addToWishlist,
        removeWishlistItem,
      });

  return (
<button
  onClick={handleToggleWishlist}
  className="group relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
  aria-label="Add to wishlist"
>
  {/* The Bubble Layer */}
  <div className="absolute inset-0 rounded-full transition-all duration-300 
    group-hover:bg-green-200 group-active:bg-green-300 group-active:scale-90" 
  />

  {/* The Heart Icon */}
  <Heart
    size={20}
    className={`relative z-10 transition-colors duration-300 ${
      isWishlisted 
        ? "fill-green-700 text-green-700" 
        : "text-gray-500 group-hover:text-green-600"
    }`}
  />
</button>
  );
}
