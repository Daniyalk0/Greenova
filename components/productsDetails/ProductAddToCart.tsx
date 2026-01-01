// app/products/[slug]/ProductAddToCart.tsx
"use client";

import { useState } from "react";
import QuantitySelect from "../ui/QuantitySelect";
import { addToCartUtil } from "@/lib/addToCartUtil";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store/store";
import { useSession } from "next-auth/react";
import { fetchCartProducts, setLocalCart } from "@/src/store/cartProductsSlice";
// import QuantitySelect from "./QuantitySelect";
import { syncLocalCartToSupabase } from "@/src/app/actions/cart"
import { addToCart, getCart } from "@/lib/cartUtils"
import { any } from "zod";

type Props = {
  product: any;
};

type SelectedWeightPrice = {
  weight: number;
  price: number;
}

export default function ProductAddToCart({
  product,

}: Props) {

  const weightOptions = product.availableWeights?.map((w: number) => ({
    weight: w,
    price: (product.basePricePerKg ?? 0) * w,
  })) ?? [];

  const defaultOption = weightOptions.find(opt => opt.weight === 1) || weightOptions[0]

  const [selectedWeightPrice, setSelectedWeightPrice] = useState<SelectedWeightPrice>(defaultOption);

  const cartProducts = useSelector((state: RootState) => state.cartProducts.items);

  const isInCart = cartProducts?.some(item => item.productId === product.id);

  const [localProducts, setLocalProducts] = useState(cartProducts || []);
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession()

  const handleAddToCart = () =>
    addToCartUtil({
      product,
      selectedWeightPrice,
      cart : cartProducts,
      localProducts,
      session,
      dispatch,
      setLocalCart,
      syncLocalCartToSupabase,
      fetchCartProducts,
      addToCart,
      getCart,
    });

  return (
    <div className="space-y-3">
      {/* Weight / quantity dropdown */}
      <div className="mt-2 w-fit">
        <QuantitySelect
          options={weightOptions}
          onSelect={(opt) => setSelectedWeightPrice(opt)}
        />
      </div>


      {/* Add to cart button */}
      <button
        disabled={!selectedWeightPrice}
        onClick={handleAddToCart
        }
        className={`w-full font-dmsans_semibold py-3 rounded-xl font-medium transition
          ${selectedWeightPrice
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        {selectedWeightPrice
          ? `Add to Cart • ₹${selectedWeightPrice.price}`
          : "Select quantity"}
      </button>
    </div>
  );
}
