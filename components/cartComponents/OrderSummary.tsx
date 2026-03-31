"use client";
import React from "react";

const OrderSummary = ({
  products,
  pricing,
  mode = "cart",
}: {
  products?: any[];
  pricing?: any;
  mode?: "cart" | "checkout";
}) => {
  return (
    <div className="w-full bg-white">
      {/* Header - Only show if not in a container that already has a header */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Order Summary
      </h2>

      {/* Product list - Specific to Checkout Mode */}
      {mode === "checkout" && products && products.length > 0 && (
        <div className="mb-6">
          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {products.map((p) => (
              <div
                key={p.productId}
                className="flex items-center gap-4 group"
              >
                {/* Image Container */}
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    Qty: {p.weight} kg
                  </p>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    ₹{(p.basePricePerKg * p.weight).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="h-px bg-gray-100 mt-6" />
        </div>
      )}

      {/* Price Calculation Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">₹{pricing?.subtotal?.toLocaleString()}</span>
        </div>

        {pricing?.discountAmount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <div className="text-right">
              <span className="font-medium text-green-600">
                - ₹{pricing?.discountAmount?.toLocaleString()}
              </span>
              <span className="block text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider mt-1">
                {pricing.discountPercent}% OFF SAVED
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Delivery Charge</span>
          <span className="font-medium text-green-600 uppercase text-xs tracking-wide">Free</span>
        </div>

        {/* Total Divider */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">Total Amount</span>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                ₹{pricing?.total?.toLocaleString()}
              </span>
              <p className="text-[10px] text-gray-400 mt-1">Inclusive of all taxes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;