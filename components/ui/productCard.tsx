"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import QuantitySelect from "./QuantitySelect"
import { addToCart, getCart } from "@/lib/cartUtils"
import { useSession } from "next-auth/react"
import { getCartItemsFromSupabase, removeCartItem, syncLocalCartToSupabase } from "@/src/app/actions/cart"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/src/store/store"
import { fetchCartProducts, setLocalCart } from "@/src/store/cartProductsSlice"
import { addToWishlist, removeWishlistItem } from "@/src/app/actions/like"
import { fetchWishlistProducts, setLocalWishlist } from "@/src/store/wishListSlice"
import { toggleWishlistUtil } from "@/lib/wishlistUtils"
import { addToCartUtil } from "@/lib/addToCartUtil"
import Link from "next/link"




type Option = {
  weight: number
  price: number
}
// export interface Product {
//   name?: string;
//   slug?: string;
//   subCategory?: string;
//   id?: number;
//   category?: string;
//   imageUrl?: string;
//   nutritions?: {
//     calories?: number;
//     fat?: number;
//     sugar?: number;
//     carbohydrates?: number;
//     protein?: number;
//   };
//   basePricePerKg?: number;
//   availableWeights?: number[];
//   rating?: number;
//   discount?: number;
//   description?: string;
//   inStock?: boolean;
// }


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
  cart,
  wishlist
}: ProductCardProps) => {

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

  // const handleAddToCart = async () => {
  //   const totalPrice = (product.basePricePerKg || 0) * (selectedWeightPrice.weight || 0);

  //   const productWithWeight = {
  //     ...product,
  //     weight: selectedWeightPrice.weight,
  //     totalPrice,
  //   };

  //   const existingItem = Array.isArray(localProducts)
  //     ? localProducts.find(
  //       (item) =>
  //         item.productId === product.id &&
  //         item.weight === selectedWeightPrice.weight
  //     )
  //     : null;

  //   if (existingItem) {
  //     alert(
  //       `This variant (${selectedWeightPrice.weight} kg) of ${product.name} is already in your cart.`
  //     );
  //     return;
  //   }

  //   const previous = [...cart];

  //   // -------------- 1️⃣ OPTIMISTIC UPDATE --------------
  //   const updatedOptimistic = [...cart, productWithWeight];
  //   dispatch(setLocalCart(updatedOptimistic)); // instant visual update
  //   alert(`${selectedWeightPrice.weight} kg of ${product.name} added to your online cart!`);

  //   if (session?.user?.id) {
  //     // dispatch(setLocalCart())
  //     try {
  //       await syncLocalCartToSupabase(Number(session.user.id), [productWithWeight]);

  //       // const updatedCart = await getCartItemsFromSupabase(Number(session?.user?.id))
  //       setTimeout(() => {
  //         dispatch(fetchCartProducts(Number(session.user.id))); // true sync
  //       }, 150);
  //     } catch (error) {
  //       console.error("Failed syncing:", error);

  //       // rollback if failed
  //       dispatch(setLocalCart(previous));
  //       alert("Failed to add item. Please try again.");
  //     }
  //   } else {
  //     addToCart(productWithWeight, selectedWeightPrice.weight);
  //     dispatch(setLocalCart(getCart())); // instant state
  //     alert(`${selectedWeightPrice.weight} kg of ${product.name} added to local cart!`);
  //   }
  // };





  // const isInWishlist = wishlist?.some(item => item.productId === product.id);

  // const handleToggleWishlist = async () => {
  //   if (!session?.user?.id) {
  //     alert("❌ You must be logged in to modify the wishlist.");
  //     return;
  //   }

  //   const userId = Number(session.user.id);

  //   const previousWishlist = [...wishlist];

  //   if (isInWishlist) {
  //     // -------------- REMOVE ITEM --------------
  //     const updatedOptimistic = wishlist.filter(item => item.productId !== product.id);
  //     dispatch(setLocalWishlist(updatedOptimistic)); // instant visual update
  //     alert(`${product.name} removed from your wishlist.`);

  //     try {
  //       await removeWishlistItem(product?.id); // server action
  //       setTimeout(() => dispatch(fetchWishlistProducts(userId)), 150);
  //     } catch (error) {
  //       console.error("Failed removing from wishlist:", error);
  //       dispatch(setLocalWishlist(previousWishlist)); // rollback
  //       alert("Failed to remove item. Please try again.");
  //     }
  //   } else {
  //     // -------------- ADD ITEM --------------
  //     const updatedOptimistic = [...wishlist, { productId: product.id, ...product }];
  //     dispatch(setLocalWishlist(updatedOptimistic)); // instant visual update
  //     alert(`${product.name} added to your wishlist!`);

  //     try {
  //       await addToWishlist(userId, product.id); // server action
  //       setTimeout(() => dispatch(fetchWishlistProducts(userId)), 150);
  //     } catch (error) {
  //       console.error("Failed adding to wishlist:", error);
  //       dispatch(setLocalWishlist(previousWishlist)); // rollback
  //       alert("Failed to add item. Please try again.");
  //     }
  //   }
  // };

  const isInCart = cart?.some(item => item.productId === product.id);


  const handleAddToCart = () =>
    addToCartUtil({
      product,
      selectedWeightPrice,
      cart,
      localProducts,
      session,
      dispatch,
      setLocalCart,
      syncLocalCartToSupabase,
      fetchCartProducts,
      addToCart,
      getCart,
    });

  const isInWishlist = wishlist?.some(item => item.productId === product.id);

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
    <div className="w-full bg-white rounded-2xl overflow-visible 
            shadow-[0_0_15px_0_rgba(0,0,0,0.15)] 
            hover:shadow-[0_0_25px_0_rgba(0,0,0,0.2)] 
            transition px-3 py-4 relative">
      {/* ✅ Product Image */}


      <div className="flex justify-center">

        <Image
          src={product?.imageUrl || '/100.png'}
          alt={'ff'}
          width={100}
          height={100}
          className="h-20 w-auto object-contain"
        />
      </div>


      {/* ✅ Product Info */}
      <h3 className="mt-4 text-md text-gray-800 font-monasans_semibold truncate">
        {product?.name}
      </h3>
      <p className="text-xs text-gray-500 font-dmsans_light">Seasonal Special</p>

      {/* ✅ Weight / Quantity Selector */}
      <QuantitySelect options={options} onSelect={(opt) => setSelectedWeightPrice(opt)} />

      {/* ✅ Price */}
      <div className="prices flex items-center justify-start gap-1 font-monasans_semibold text-xs my-3">
        <span>₹{product?.basePricePerKg}</span>
      </div>

      {/* ✅ Actions */}
      <div className="flex items-center gap-2 mt-3">
        {/* Save Icon */}
        <button
          className={`flex-1 max-w-[20%] flex justify-center items-center p-2 border rounded-lg hover:bg-gray-100 ${isInWishlist ? "border-red-500" : "border-gray-300"
            }`}
          onClick={handleToggleWishlist}
        >
          <Heart
            className={`w-5 h-5 text-gray-600 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>

        {/* Add to Cart Button */}
        {isInCart ? (<Link href={'/cart'} className="flex-[4] w-full flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" >
         <ShoppingCart className="w-5 h-5" />
          <span className="text-[0.7rem] font-dmsans_italic_light">Go to Cart</span>
        </Link>) : (
          <button className="flex-[4] w-full flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" onClick={handleAddToCart}>
            <ShoppingCart className="w-5 h-5" />
            <span className="text-[0.7rem] font-dmsans_italic_light">Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
