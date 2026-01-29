// app/products/[slug]/ProductAddToCart.tsx
"use client";

import { useState } from "react";
import QuantitySelect from "../ui/QuantitySelect";
import { addToCartUtil } from "@/lib/addToCartUtil";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store/store";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

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

  const defaultOption = weightOptions.find((opt: SelectedWeightPrice) => opt.weight === 1) || weightOptions[0]

  const [selectedWeightPrice, setSelectedWeightPrice] = useState<SelectedWeightPrice>(defaultOption);

  const cartProducts = useSelector((state: RootState) => state.cartProducts.items);

  const isInCart = cartProducts?.some(item => item.productId === product.id);

  const [localProducts, setLocalProducts] = useState(cartProducts || []);
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession()

  const handleAddToCart = async () => {
    
    const result = await addToCartUtil({
      product,
      weight: selectedWeightPrice.weight,
      cart: cartProducts,
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



  const isExactInCart = cartProducts.some(
    (item) =>
      item.productId === product.id &&
      item.weight === selectedWeightPrice?.weight
  );


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
        disabled={!selectedWeightPrice || isExactInCart}
        onClick={handleAddToCart}
        className={`
    w-full font-dmsans_semibold py-3 rounded-xl transition
    ${!selectedWeightPrice || isExactInCart
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
          }
  `}
      >
        {!selectedWeightPrice
          ? "Select quantity"
          : isExactInCart
            ? "Added to Cart"
            : `Add to Cart • ₹${selectedWeightPrice.price.toLocaleString()}`
        }
      </button>


    </div>
  );
}
