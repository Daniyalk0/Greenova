"use client"
import React from 'react'
import { X } from 'lucide-react'
import Image from 'next/image';

type CartProductCardProps = {
    item: any;
    handleRemoveProduct: (productId: number, weight: number, product: any) => Promise<void>;
};

const CartProductcard = ({ item, handleRemoveProduct }: CartProductCardProps) => {

    const basePricePerKg = item?.basePricePerKg ?? 0;
    const baseTotalPrice = basePricePerKg * (item?.weight ?? 0);
    const discountedPricePerKg = item?.discount > 0
        ? Math.round(basePricePerKg - (basePricePerKg * item?.discount) / 100)
        : Math.round(basePricePerKg);
    const discountedTotalPrice = Math.round(discountedPricePerKg * (item?.weight ?? 0));

    return (
        <div className="flex items-center w-full relative group bg-transparent">
            
            {/* Column 1: Image + Details (70% on mobile, 50% on desktop to match parent header) */}
            <div className="w-[70%] sm:w-[50%] flex items-center gap-3 sm:gap-4 pr-2 sm:pr-0">
                {/* Product Image */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-[4.5rem] lg:h-[4.5rem] flex-shrink-0 bg-[#f4f8f5] rounded-xl border border-green-100 overflow-hidden mix-blend-multiply">
                    <Image
                        src={item?.imageUrl}
                        alt="product image"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover mix-blend-multiply"
                        unoptimized
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center min-w-0">
                    <h1 className="font-monasans_semibold text-gray-900 text-[13px] sm:text-[15px] leading-snug truncate w-full">
                        {item?.name}
                    </h1>

                    {/* Mobile-only Weight (Since Col 2 is hidden on mobile) */}
                    <span className="sm:hidden font-dmsans_light text-gray-500 text-[11px] mt-0.5">
                        {item?.weight}kg
                    </span>

                    {/* Price Block */}
                    <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
                        {item?.discount > 0 ? (
                            <>
                                <span className="font-dmsans_semibold text-[#0c831f] text-[13px] sm:text-[14px]">
                                    ₹{discountedPricePerKg}/kg
                                </span>
                                <span className="font-dmsans_light line-through text-gray-400 text-[10px] sm:text-[11px]">
                                    ₹{basePricePerKg}/kg
                                </span>
                                <span className="bg-[#0c831f]/10 text-[#0c831f] font-dmsans_semibold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wide">
                                    {item?.discount}% OFF
                                </span>
                            </>
                        ) : (
                            <span className="font-dmsans_semibold text-[#0c831f] text-[13px] sm:text-[14px]">
                                ₹{discountedPricePerKg}/kg
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Column 2: Weight / Qty (Hidden on mobile, 25% on desktop to match parent header) */}
            <div className="hidden sm:flex w-[25%] flex-col items-center justify-center font-dmsans_semibold text-gray-700 text-[14px] sm:text-[15px]">
                {item?.weight}kg
            </div>

            {/* Column 3: Total (30% on mobile, 25% on desktop to match parent header) */}
            <div className="w-[30%] sm:w-[25%] flex flex-col sm:flex-row items-end sm:items-center justify-end sm:justify-center pr-8 sm:pr-0">
                {/* Mobile label for total */}
                <span className="sm:hidden text-[9px] font-dmsans_light text-gray-400 uppercase tracking-widest mb-0.5">
                    Total
                </span>
                <p className="font-monasans_semibold text-gray-900 text-[15px] sm:text-[17px]">
                    ₹{discountedTotalPrice}
                </p>
            </div>

            {/* Delete button (Absolutely positioned to the right) */}
            <button
                onClick={() => handleRemoveProduct(item?.productId, item?.weight, item)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 focus:outline-none z-10"
                aria-label="Remove item"
            >
                <X className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </button>
            
        </div>
    )
}

export default CartProductcard