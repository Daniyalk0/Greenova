"use client"
import { ShoppingCart } from 'lucide-react'
import React from 'react'

type CartIconProps = {
  itemCount: number | null;
};

const NavCart = ({ itemCount }: CartIconProps) => {
    console.log(itemCount);
    
  return (
    <div className="relative flex items-center cursor-pointer gap-1">
      <div className="relative flex items-center">
        <ShoppingCart className="w-5 h-5" />
     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
  {itemCount}
</span>

      </div>
    </div>
  );
};


export default NavCart