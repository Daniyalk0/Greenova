"use client"
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useState } from 'react'
import NavLink from '../NavLink';
import { usePathname } from 'next/navigation';

type NavLinksProps = {
    // setIsOpen: Dispatch<SetStateAction<boolean>>;
    // isOpen: boolean;
    isShopOpen: boolean;
    setIsShopOpen: Dispatch<SetStateAction<boolean>>;
};
const NavDesktopLinks = ({ isShopOpen, setIsShopOpen }: NavLinksProps) => {
    const [shopHover, setShopHover] = useState(false)
    const pathname = usePathname();

    const isActive =
        pathname.startsWith("/fruits") ||
        pathname.startsWith("/vegetables") ||
        pathname.startsWith("/herbs");

    const Icon = isShopOpen ? <ChevronUp className={`w-4 h-4 transition-all duration-300  ${isActive || shopHover ? "text-[#6ed067]" : "text-[#0f3c27]"
        }`} /> : <ChevronDown className={`w-4 h-4 transition-all duration-300  ${isActive || shopHover ? "text-[#6ed067]" : "text-[#0f3c27]"
        }`} />;
    return (
        <div className="w-full flex justify-center">
            <div className="links text-[0.7rem] sm:text-[0.9rem] md:text-[0.8rem] lg:text-[0.9rem]  px-3 py-2 rounded-xl flex items-center gap-3 sm:gap-6 md:gap-5">
                <NavLink href="/" className="cursor-pointer">
                    Home
                </NavLink>

                <div
                    className="flex  items-center justify-between cursor-pointer rounded-lg md:relative "
                    onClick={() => setIsShopOpen(prev => !prev)}
                >
                    <div onMouseEnter={() => setShopHover(true)} onMouseLeave={() => setShopHover(false)} className={`transition-all duration-300 flex items-center justify-center   ${isActive || shopHover ? "text-[#6ed067]" : "text-[#0f3c27]"
                        }`}>
                        <p>Shop</p>
                        {Icon}
                    </div>

                    {/* Sub-category box */}
                    {isShopOpen && (

                        <div className="absolute right-0  md:-right-[25rem] top-full w-[100vw] md:w-[40rem] bg-white rounded-sm shadow-lg p-4 flex text-[0.6rem] md:justify-between justify-center gap-7 sm:gap-14 z-50 sm:text-[0.9rem] md:text-[0.8rem] lg:text-[0.9rem] md:top-10">
                            {/* Fruits */}
                            <div className="md:flex-1">
                                <p className="font-semibold text-green-700">Fruits</p>
                                <ul className="mt-1 sm:mt-2 sm:space-y-1 text-gray-700 lg:mt-3 lg:space-y-2">
                                    <li>
                                        <NavLink href="/fruits/fresh" className="cursor-pointer">
                                            Fresh Fruits
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink href="/fruits/exotic" className="cursor-pointer">
                                            Exotic Fruits
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink href="/fruits/seasonal" className="cursor-pointer">
                                            Seasonal Fruits
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink href="/fruits/dry" className="cursor-pointer">
                                            Dry Fruits
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>

                            {/* Vegetables */}
                            <div className="md:flex-1">
                                <p className="font-semibold text-green-700">Vegetables</p>
                                <ul className="mt-1 lg:mt-3 sm:mt-2 sm:space-y-1 text-gray-700 lg:space-y-2">
                                    <li>
                                        <NavLink href="/vegetables/leafy" className="cursor-pointer">
                                            Leafy Greens
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink href="/vegetables/root" className="cursor-pointer">
                                            Root Vegetables
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink href="/vegetables/organic" className="cursor-pointer">
                                            Organic Vegetables
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink href="/vegetables/seasonal" className="cursor-pointer">
                                            Seasonal Vegetables
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>

                            {/* Extras */}
                            <div className="md:flex-1">
                                <p className="font-semibold text-green-700">More</p>
                                <ul className="mt-1 lg:mt-3 sm:mt-2 sm:space-y-1 text-gray-700 lg:space-y-2">
                                    <li>
                                        <NavLink href="/herbs" className="cursor-pointer">
                                            Herbs
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    )}

                </div>

                <NavLink href="/blog" className="cursor-pointer">
                    Blog
                </NavLink>
                <NavLink href="/about" className="cursor-pointer">
                    About Us
                </NavLink>
                <NavLink href="#contact" className="cursor-pointer">
                    Contact
                </NavLink>

            </div>
        </div>
    )
}

export default NavDesktopLinks