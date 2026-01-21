"use client"
import React from 'react'
import { X } from 'lucide-react'
import Image from 'next/image';

type CartProductCardProps = {
    item: any;
    handleRemoveProduct: (productId: number, weight: number, product: any) => Promise<void>;

};

const CartProductcard = ({ item, handleRemoveProduct }: CartProductCardProps) => {
    // const options = item.availableWeights?.map((w) => ({
    //     weight: w,
    //     price: (item.basePricePerKg || 0) * w,
    // })) || [];

    const basePrice = item?.basePricePerKg * item?.weight;
    const discountedPrice =
        item?.discount > 0
            ? Math.round(basePrice - (basePrice * item?.discount) / 100)
            : Math.round(basePrice);


    return (
        <div
            key={item.id}
            className="flex items-center w-full border-b border-gray-200 py-3 relative"
        >
            {/* Column 1: Image + Name + Price */}
            <div className="w-[50%] flex items-center gap-3">
                <Image
                    src={item?.imageUrl}
                    alt="product image"
                    width={200}        // doesn't affect UI because Tailwind classes override
                    height={200}
                    className="w-[14vw] md:w-[5rem] lg:w-[4rem] rounded object-cover"
                    unoptimized        // keeps the same rendering + avoids layout shift
                />
                <div className="flex flex-col items-start">
                    <h1 className="font-monasans_semibold text-sm sm:text-lg md:text-sm">
                        {item?.name}
                    </h1>
                    {item?.discount > 0 ? (
                        <div className="flex items-center gap-2">
                            {/* Original price with strike-through */}


                            {/* Discounted price */}
                            <span className=" text-[0.7rem] sm:text-[0.8rem] font-dmsans_light">
                                ₹{discountedPrice}/kg
                            </span>

                            <span className="line-through font-dmsans_light text-gray-500 text-[0.6rem] sm:text-[0.7rem]">
                                ₹{item?.basePricePerKg * item?.weight}/kg
                            </span>

                            {/* % off badge */}
                            <span className="bg-green-100 font-dmsans_light text-green-800 text-[0.6rem] sm:text-[0.7rem] px-1 rounded">
                                {item?.discount}% OFF
                            </span>
                        </div>
                    ) : (
                        // No discount, just show price
                        <span className="font-dmsans_light text-[0.7rem] sm:text-[0.9rem]">
                            ₹{discountedPrice}/kg
                        </span>
                    )}
                </div>
            </div>

            {/* Column 2: Weight */}
            <div className="w-[25%] flex flex-col items-center justify-center font-monasans_semibold">
                <p className="text-sm font-bold">{item?.weight}kg</p>
            </div>

            {/* Column 3: Total */}
            <div className="w-[25%] flex flex-col items-center justify-center font-monasans_semibold">
                <p className="text-sm font-bold">{discountedPrice}</p>
            </div>

            {/* Delete button */}
            <button
                onClick={() => handleRemoveProduct(item?.productId, item?.weight, item)}
                className="absolute right-0 top-1 border border-red-500 rounded-full text-red-500 cursor-pointer hover:scale-110 transition-all duration-200"
            >
                <X width={13} height={13} strokeWidth={3} />
            </button>
        </div>


    )
}

export default CartProductcard