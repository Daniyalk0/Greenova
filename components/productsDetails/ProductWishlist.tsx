// app/products/[slug]/ProductWishlist.tsx
"use client";

import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store/store";
import { useSession } from "next-auth/react";
import { toggleWishlistUtil } from "@/lib/wishlistUtils";
import { toast } from "react-toastify";

type Props = {
  product: any;
  onToggle?: (productId: string) => void; // 👈 your function
};

export default function ProductWishlist({ product, onToggle }: Props) {
  const wishlist = useSelector(
    (state: RootState) => state.wishlist.items
  );

  const isWishlisted = wishlist.some(
    (item) => item.productId === product.id
  );

    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession()
  
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
