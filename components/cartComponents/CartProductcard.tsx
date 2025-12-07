"use client"
import React from 'react'
import { X } from 'lucide-react'
import Image from 'next/image';

type CartProductCardProps = {
    item: any;
    handleRemoveProduct: (productId: number, weight: number) => Promise<void>;
};

const CartProductcard = ({ item, handleRemoveProduct }: CartProductCardProps) => {
    // const options = item.availableWeights?.map((w) => ({
    //     weight: w,
    //     price: (item.basePricePerKg || 0) * w,
    // })) || [];



    return (
        <div
            key={item.id}
            className="flex items-center w-full border-b border-gray-200 py-3 relative"
        >
            {/* Column 1: Image + Name + Price */}
            <div className="w-[50%] flex items-center gap-3">
                <Image
                    src={item?.Product?.imageUrl}
                    alt="product image"
                    width={200}        // doesn't affect UI because Tailwind classes override
                    height={200}
                    className="w-[14vw] md:w-[5rem] lg:w-[4rem] rounded object-cover"
                    unoptimized        // keeps the same rendering + avoids layout shift
                />
                <div className="flex flex-col items-start">
                    <h1 className="font-monasans_semibold text-sm sm:text-lg md:text-sm">
                        {item?.Product?.name}
                    </h1>
                    <p className="font-dmsans_light text-[0.7rem] sm:text-[0.9rem]">
                        ₹{item?.Product?.basePricePerKg}/kg
                    </p>
                </div>
            </div>

            {/* Column 2: Weight */}
            <div className="w-[25%] flex flex-col items-center justify-center font-monasans_semibold">
                <p className="text-sm font-bold">{item?.weight}kg</p>
            </div>

            {/* Column 3: Total */}
            <div className="w-[25%] flex flex-col items-center justify-center font-monasans_semibold">
                <p className="text-sm font-bold">{item?.totalPrice}</p>
            </div>

            {/* Delete button */}
            <button
                onClick={() => handleRemoveProduct(item.productId, item.weight)}
                className="absolute right-0 top-1 border border-red-500 rounded-full text-red-500 cursor-pointer hover:scale-110 transition-all duration-200"
            >
                <X width={13} height={13} strokeWidth={3} />
            </button>
        </div>


    )
}

export default CartProductcard