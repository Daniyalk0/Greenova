"use client";
import { calcOrderSummary } from "@/lib/calcOrderSummary";
import { useAuthSource } from "@/lib/useAuthSource";
import { useUI } from "@/src/context/ui-context";
import { AppLocation } from "@/src/types/next-auth";
import React from "react";

const OrderSummary = ({ address, products }: { address?: AppLocation | null; products: any[] }) => {
 const { isNextAuthUser } = useAuthSource();
 const { subtotal, deliveryFee, discount, total } =
    calcOrderSummary(products, isNextAuthUser);
    
 const { isLocationModalOpen, closeLocationModal, openLocationModal } = useUI();

  return (
    <div className="w-full p-5 md:w-[40%] mx-auto px-6 bg-white shadow-lg rounded-lg">
      {/* Address */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 font-dmsans_semibold border-b   border-gray-300">Delivery Address</h2>
        {address ? (
          <p className="text-zinc-700 text-sm font-dmsans_light font-semibold ">{address.address}</p>
        ) : (
          <p className="text-gray-500 text-xs font-dmsans_light">No address selected</p>
        )}
        <button className="mt-2 font-dmsans_light text-blue-600 underline  text-sm" onClick={openLocationModal}>
          Change Address
        </button>
      </div>

      {/* Products List */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 font-monasans_semibold">Order Summary</h2>
        <div className="space-y-3  md:max-h-[200px] overflow-y-auto">
          {products.map((p) => (
            <div
              key={p?.productId}
              className="flex justify-between items-center border-b pb-2"
            >
              <div className="flex flex-col">
                <span className="font-semibold font-dmsans_semibold">{p?.name}</span>
                <span className="text-xs text-gray-500 font-dmsans_light">
                  {p?.weight} kg
                </span>
              </div>
              <span className="font-dmsans_semibold ">
                ₹{p?.basePricePerKg * p?.weight}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="mb-6 space-y-2 text-right font-dmsans_semibold">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>- ₹{discount}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-dmsans_semibold">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
