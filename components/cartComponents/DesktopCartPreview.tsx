"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { closeCart } from "@/src/store/cartPreviewUISlice";
import { RootState } from "@/src/store/store";
import { calcOrderSummary } from "@/lib/calcOrderSummary";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DesktopCartPreview = ({ products }: any) => {
  const dispatch = useDispatch();

  const isOpen = useSelector(
    (state: RootState) => state.cartUI.isCartOpen
  );

  const { total, discountedPrice } = calcOrderSummary(products)
  console.log(total);

  const router = useRouter();

  const handleCartRoute = () => {
    dispatch(closeCart());
    router.push('/cart');
  }

  return (
    <div className="hidden md:block">
      {/* Backdrop (click to close) */}
      <div
        onClick={() => dispatch(closeCart())}
        className={`
    fixed inset-0 bg-black/40 z-40
    transition-opacity duration-300
    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
      />

      {/* Drawer (LEFT SIDE) */}
      <aside
        className={`
    fixed left-0 top-0 h-screen w-[350px]
    bg-white z-50 flex flex-col 
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    pointer-events-auto
  `}
      >

        {/* Header */}
        <div className="px-4 py-4 border-b flex items-center justify-between font-monasans_semibold">
          {/* Left: Title */}
          <div className="flex flex-col justify-start">

            <h2 className="text-lg font-semibold">My Cart</h2>

            {/* Center: Item count */}
            <p className=" text-xs text-gray-500">
              {products?.length} items
            </p>
          </div>

          {/* Right: Close Icon */}
          <button
            onClick={() => dispatch(closeCart())}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>


        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 ">
          {products.map((p: any) => {
            const basePrice = p?.Product?.basePricePerKg * p?.weight;
           const discountedPrice =
  p?.Product?.discount > 0
    ? Math.round(basePrice - (basePrice * p?.Product?.discount) / 100)
    : Math.round(basePrice);


            return (
              <div key={p.id} className="flex gap-3 py-3 border-b">
                {/* Image */}
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                  {p?.Product?.imageUrl && (
                    <img
                      src={p?.Product?.imageUrl}
                      alt={p?.Product?.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  {/* Product Name */}
                  <p className="text-sm font-dmsans_semibold">{p?.Product?.name}</p>

                  {/* Weight */}
                  <p className="text-xs text-gray-500 font-dmsans_light">
                    {p?.weight} kg
                  </p>

                  {/* Price & Subtotal */}
                  <div className="flex justify-between mt-2 items-center">
                    {/* Price */}
                    <div className="flex items-center gap-2 font-dmsans_light">
                      {/* Discounted price */}
                      <span className="text-sm font-semibold text-black">
                        ₹{discountedPrice}
                      </span>

                      {/* Original price with strike-through */}
                      {p?.Product?.discount > 0 && (
                        <>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{basePrice}
                          </span>
                          <span className="bg-green-100 text-green-800 text-[0.6rem] px-1 rounded">
                            {p?.Product?.discount}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Quantity / Add control */}
                    <div className="h-7 w-20 bg-green-100 rounded" />
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Footer */}
        <div className="border-t px-4 py-4 font-monasans_semibold">
          <div className="flex justify-between text-sm mb-3">
            <span>Total</span>
            <span className="font-semibold">₹{total}</span>
          </div>
          <div onClick={handleCartRoute} className="cursor-pointer block text-center w-full bg-green-600 text-white py-3 rounded-xl font-dmsans_semibold">
            Proceed to Cart
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DesktopCartPreview;
