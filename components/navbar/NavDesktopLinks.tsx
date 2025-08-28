"use client"
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'

type NavLinksProps = {
    // setIsOpen: Dispatch<SetStateAction<boolean>>;
    // isOpen: boolean;
    isShopOpen: boolean;
    setIsShopOpen: Dispatch<SetStateAction<boolean>>;
};
const NavDesktopLinks = ({isShopOpen, setIsShopOpen}: NavLinksProps) => {
     const Icon = isShopOpen ? <ChevronUp className="w-4 h-4 text-gray-700" /> : <ChevronDown  className="w-4 h-4 text-gray-700" />;
  return (
     <div className="w-full flex justify-center">
            <div className="links text-[0.7rem] sm:text-[0.9rem] md:text-[0.8rem] lg:text-[0.9rem]  px-3 py-2 rounded-xl flex items-center gap-3 sm:gap-6 md:gap-5">
                <Link href={'/'}>Home</Link>

                <div
                    className="flex  items-center justify-between cursor-pointer rounded-lg md:relative "
                    onClick={() => setIsShopOpen(prev => !prev)}
                >
                    <div className="flex items-center ">
                        <p>Shop</p>
                        {Icon}
                    </div>

                    {/* Sub-category box */}
                    {isShopOpen && (

                        <div className="absolute right-0  md:-right-[25rem] top-full w-[100vw] md:w-[40rem] bg-white rounded-sm shadow-lg p-4 flex text-[0.6rem] md:justify-between justify-center gap-7 sm:gap-14 z-50 sm:text-[0.9rem] md:text-[0.8rem] lg:text-[0.9rem] md:top-10">
                            {/* Fruits */}
                            <div className="md:flex-1">
                                <p className="font-semibold text-green-700">Fruits</p>
                                <ul className="mt-1 sm:mt-2 sm:space-y-1 text-gray-700 lg:mt-3 lg:space-y-2 ">
                                    <li className="cursor-pointer hover:text-green-600">Fresh Fruits</li>
                                    <li className="cursor-pointer hover:text-green-600">Exotic Fruits</li>
                                    <li className="cursor-pointer hover:text-green-600">Seasonal Fruits</li>
                                    <li className="cursor-pointer hover:text-green-600">Dry Fruits</li>
                                </ul>
                            </div>

                            {/* Vegetables */}
                            <div className="md:flex-1">
                                <p className="font-semibold text-green-700">Vegetables</p>
                                <ul className="mt-1 lg:mt-3 sm:mt-2 sm:space-y-1  text-gray-700 lg:space-y-2">
                                    <li className="cursor-pointer hover:text-green-600">Leafy Greens</li>
                                    <li className="cursor-pointer hover:text-green-600">Root Vegetables</li>
                                    <li className="cursor-pointer hover:text-green-600">Organic Vegetables</li>
                                    <li className="cursor-pointer hover:text-green-600">Seasonal Vegetables</li>
                                </ul>
                            </div>

                            {/* Extras */}
                            <div className="md:flex-1">
                                <p className="font-semibold text-green-700">More</p>
                                <ul className="mt-1 lg:mt-3 sm:mt-2 sm:space-y-1 text-gray-700 lg:space-y-2">
                                    <li className="cursor-pointer hover:text-green-600">Herbs</li>
        
                                </ul>
                            </div>
                        </div>


                    )}

                </div>

                <Link href={'/'}>Blog</Link>
                <Link href={'/'}>About us</Link>
                <Link href={'/'}>Contact</Link>
            </div>
            </div>
  )
}

export default NavDesktopLinks