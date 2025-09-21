"use client"
import React from "react"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import QuantitySelect from "./QuantitySelect"



type Option = {
  id: number
  label: string
}

type ProductCardProps = {
  name?: string
  price?: number
  img?: string
  options?: Option[]   // 👈 fix here
}

const ProductCard = ({
  name = "Fresh Mangoes",
  price = 120,
  options = [],
  img = "/apple.png"
}: ProductCardProps) => {
  return (
    <div className="w-full bg-white rounded-2xl overflow-visible 
            shadow-[0_0_15px_0_rgba(0,0,0,0.15)] 
            hover:shadow-[0_0_25px_0_rgba(0,0,0,0.2)] 
            transition px-3 py-4 relative">
      {/* ✅ Product Image */}
      <div className="flex justify-center">
        <Image
          src={img}
          alt={name}
          width={100}
          height={100}
          className="h-20 w-auto object-contain"
        />
      </div>

      {/* ✅ Product Info */}
      <h3 className="mt-4 text-md text-gray-800 font-monasans_semibold truncate">
        {name}
      </h3>
      <p className="text-xs text-gray-500 font-dmsans_light">Seasonal Special</p>

      {/* ✅ Weight / Quantity Selector */}
      <QuantitySelect options={options} />

      {/* ✅ Price */}
      <div className="prices flex items-center justify-start gap-1 font-monasans_semibold text-xs my-3">
        <span>₹{price}</span>
      </div>

      {/* ✅ Actions */}
      <div className="flex items-center gap-2 mt-3">
        {/* Save Icon */}
        <button className="flex-1 max-w-[20%] flex justify-center items-center p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>

        {/* Add to Cart Button */}
        <button className="flex-[4] w-full flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[0.7rem] font-dmsans_italic_light">Add to Cart</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
