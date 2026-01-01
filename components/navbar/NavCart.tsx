"use client"
import { ShoppingCart } from 'lucide-react'
import React from 'react'

type CartIconProps = {
  itemCount: number | null;
};

const NavCart = ({ itemCount }: CartIconProps) => {

return (
  <div className="relative flex flex-col items-center cursor-pointer gap-0.5">
    
    {/* Icon + badge */}
    <div className="relative">
      <ShoppingCart className="w-5 h-5" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
        {itemCount}
      </span>
    </div>

    {/* Label */}
    <span className="text-[11px] leading-none text-gray-600">
      Cart
    </span>
  </div>
);

};


export default NavCart