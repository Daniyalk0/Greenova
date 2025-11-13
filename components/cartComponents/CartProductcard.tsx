"use client"
import React, { useState } from 'react'
import QuantitySelect from '../ui/QuantitySelect'
import { updateCartWeight } from '@/lib/cartUtils'
import { Cross, CrossIcon, Weight, X } from 'lucide-react'


const CartProductcard = ({ product, handleRemoveProduct }) => {
    const options = product.availableWeights?.map((w) => ({
        weight: w,
        price: (product.basePricePerKg || 0) * w,
    })) || [];

    console.log(product);


    // 3️⃣ Local state to keep track of selected option
    //   const [updatedWeight, setUpdatedWeight] = useState(null);



    return (

        /* Headings */
        /* <div className="flex items-center justify-between w-full border-b   border-gray-300 py-0 mb-2 font-monasans_semibold text-sm sm:text-base">
        
            <div className="flex items-center gap-3">
                <span>Item</span>
            </div>

        
            <div className="flex items-center justify-center w-[20%] ml-24  ">
                <span>Quantity</span>
            </div>

            <div className="flex items-center justify-center w-[20%]">
                <span>Total</span>
            </div>
        </div> 

        {/* Products List */

        <div
            key={product.id}
            className="flex items-center w-full border-b border-gray-200 py-3 relative"
        >
            {/* Column 1: Image + Name + Price */}
            <div className="w-[50%] flex items-center gap-3">
                <img
                    src={product?.imageUrl}
                    alt="product image"
                    className="w-[14vw] md:w-[5rem] lg:w-[4rem] rounded object-cover"
                />
                <div className="flex flex-col items-start">
                    <h1 className="font-monasans_semibold text-sm sm:text-lg md:text-sm">
                        {product?.name}
                    </h1>
                    <p className="font-dmsans_light text-[0.7rem] sm:text-[0.9rem]">
                        ₹{product.basePricePerKg}/kg
                    </p>
                </div>
            </div>

            {/* Column 2: Weight */}
            <div className="w-[25%] flex flex-col items-center justify-center font-monasans_semibold">
                <p className="text-sm font-bold">{product?.weight}kg</p>
            </div>

            {/* Column 3: Total */}
            <div className="w-[25%] flex flex-col items-center justify-center font-monasans_semibold">
                <p className="text-sm font-bold">{product?.totalPrice}</p>
            </div>

            {/* Delete button */}
            <button
                onClick={() => handleRemoveProduct(product.productId, product.weight)}
                className="absolute right-0 top-1 border border-red-500 rounded-full text-red-500 cursor-pointer hover:scale-110 transition-all duration-200"
            >
                <X width={13} height={13} strokeWidth={3} />
            </button>
        </div>


    )
}

export default CartProductcard