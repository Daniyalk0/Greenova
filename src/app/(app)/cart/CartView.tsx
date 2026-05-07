"use client";

import CartProductcard from "@/components/cartComponents/CartProductcard";
import Link from "next/link";

type CartViewProps = {
  cart: any[];
  onRemove: (productId: number, weight: number, product: any) => Promise<void>;
  onAdd: (product: any, weight: number) => Promise<void>;
//    isLoading: boolean;
};

export default function CartView({
  cart,
  onRemove,
  onAdd,
//    isLoading
}: CartViewProps) {
    //  if (isLoading) return null;
  return (
    <div className="max-w-5xl mx-auto">

      {/* Cart Box */}
      <div className="bg-white border border-green-100 rounded-2xl overflow-hidden">
        
        {cart.length > 0 && (
          <div className="hidden sm:flex px-6 py-4 text-xs text-gray-500 uppercase border-b">
            <div className="w-1/2">Item</div>
            <div className="w-1/4 text-center">Qty</div>
            <div className="w-1/4 text-center">Total</div>
          </div>
        )}

        <div className="divide-y">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={`${item.id}-${item.weight}`} className="p-4 sm:p-6">
                <CartProductcard
                  item={item}
                  handleRemoveProduct={onRemove}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-6">
                <div className="w-24 h-24 bg-green-50/50 rounded-full flex items-center justify-center mb-6 border border-green-100">
                  <span className="text-4xl opacity-80">🛒</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-monasans_semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-[15px] font-dmsans_light text-gray-500 text-center max-w-md leading-relaxed">
                  Looks like you haven&apos;t added anything to your cart yet.
                  Explore our fresh products and start filling it up!
                </p>
              </div>
          )}
        </div>
      </div>

      {/* Bottom Total */}
    {cart.length > 0 && (
  <div className="mt-6 font-dmsans_semibold bg-white border rounded-2xl p-4 flex justify-between items-center">
    
    {/* Total */}
    <div className="flex flex-col">
      <span className="text-xs sm:text-sm text-gray-500 font-dmsans_light">
        Total Amount
      </span>
      <span className="text-lg sm:text-xl font-semibold text-gray-900">
        ₹
        {Math.round(
          cart.reduce((acc, item) => {
            const base = item.basePricePerKg * item.weight;

            const discounted =
              item.discount > 0
                ? base - (base * item.discount) / 100
                : base;

            return acc + discounted;
          }, 0)
        ).toLocaleString("en-IN")}
      </span>
    </div>

    {/* CTA */}
    <Link
      href="/checkout"
      className="bg-[#0c831f] text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base"
    >
      Checkout
    </Link>
  </div>
)}
    </div>
  );
}