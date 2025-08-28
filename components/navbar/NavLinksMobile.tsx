"use client"
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { motion } from "framer-motion";

// type NavLinksProps = {
//     setIsOpen: Dispatch<SetStateAction<boolean>>;
//     isOpen: boolean;
//     // isShopOpen: boolean;
//     // setIsShopOpen: Dispatch<SetStateAction<boolean>>;
// };

const NavLinksMobile = () => {
    const [isShopOpen, setIsShopOpen] = useState(false)
    // if (!isOpen) return null;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="relative ">
            {/* Toggle button */}
            <div className="" >
                <svg
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                    preserveAspectRatio="xMidYMid meet"
                    data-bbox="20 20 160 160"
                    viewBox="20 20 160 160"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    data-type="shape"
                    role="img"
                    aria-label="Minimal monochrome UX/UI design for a startup website by Anzo Studio."
                    className="hover:rotate-[-90deg] transform transition duration-500 fill-current text-[#bcbcbc] cursor-pointer"
                >
                    <g>
                        <path d="M57.587 38.794c0 10.379-8.414 18.794-18.794 18.794S20 49.173 20 38.794 28.414 20 38.794 20s18.793 8.414 18.793 18.794z"></path>
                        <path d="M118.794 38.794c0 10.379-8.414 18.794-18.794 18.794s-18.794-8.414-18.794-18.794S89.621 20 100 20s18.794 8.414 18.794 18.794z"></path>
                        <path d="M180 38.794c0 10.379-8.414 18.794-18.794 18.794-10.379 0-18.794-8.414-18.794-18.794S150.827 20 161.206 20C171.586 20 180 28.414 180 38.794z"></path>
                        <path d="M118.794 100c0 10.379-8.414 18.794-18.794 18.794S81.206 110.379 81.206 100 89.621 81.206 100 81.206s18.794 8.415 18.794 18.794z"></path>
                        <path d="M180 100c0 10.379-8.414 18.794-18.794 18.794-10.379 0-18.794-8.414-18.794-18.794s8.414-18.794 18.794-18.794S180 89.621 180 100z"></path>
                        <path d="M57.587 161.206c0 10.379-8.414 18.794-18.794 18.794S20 171.586 20 161.206c0-10.379 8.414-18.794 18.794-18.794s18.793 8.415 18.793 18.794z"></path>
                        <path d="M118.794 161.206C118.794 171.585 110.38 180 100 180s-18.794-8.414-18.794-18.794c0-10.379 8.414-18.794 18.794-18.794s18.794 8.415 18.794 18.794z"></path>
                        <path d="M180 161.206c0 10.379-8.414 18.794-18.794 18.794-10.379 0-18.794-8.414-18.794-18.794 0-10.379 8.414-18.794 18.794-18.794 10.38.001 18.794 8.415 18.794 18.794z"></path>
                        <path d="M57.587 100c0 10.379-8.414 18.794-18.794 18.794S20 110.379 20 100s8.414-18.794 18.794-18.794S57.587 89.621 57.587 100z"></path>
                    </g>
                </svg>
            </div>

            {/* Dropdown box */}
            {isDropdownOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <motion.div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] sm:w-[80%] md:w-[50rem] max-h-[80vh] overflow-y-auto"

                        layout="position"
                        transition={{
                            duration: 0.45,
                            ease: "easeInOut",
                            type: "tween"
                        }}>
                            <X onClick={() => setIsDropdownOpen(false)} className='text-black'/>
                        <ul className="flex flex-col gap-3 text-gray-700 text-sm">
                            <li>
                                <Link href="/" className="hover:text-green-600">
                                    Home
                                </Link>
                            </li>

                            {/* Shop with sub dropdown */}
                            <li>
                                <div
                                    className="flex items-center justify-between cursor-pointer hover:text-green-600"
                                    onClick={() => setIsShopOpen((prev) => !prev)}
                                >
                                    <span>Shop</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${isShopOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>

                                {isShopOpen && (
                                    <div className="mt-2 ml-4 flex flex-col gap-2 text-sm text-gray-600">
                                        <p className="font-semibold text-green-700">Fruits</p>
                                        <ul className="ml-2 space-y-1">
                                            <li className="cursor-pointer hover:text-green-600">Fresh Fruits</li>
                                            <li className="cursor-pointer hover:text-green-600">Exotic Fruits</li>
                                            <li className="cursor-pointer hover:text-green-600">Seasonal Fruits</li>
                                            <li className="cursor-pointer hover:text-green-600">Dry Fruits</li>
                                        </ul>

                                        <p className="font-semibold text-green-700 mt-3">Vegetables</p>
                                        <ul className="ml-2 space-y-1">
                                            <li className="cursor-pointer hover:text-green-600">Leafy Greens</li>
                                            <li className="cursor-pointer hover:text-green-600">Root Vegetables</li>
                                            <li className="cursor-pointer hover:text-green-600">Organic Vegetables</li>
                                            <li className="cursor-pointer hover:text-green-600">Seasonal Vegetables</li>
                                        </ul>

                                        <p className="font-semibold text-green-700 mt-3">More</p>
                                        <ul className="ml-2 space-y-1">
                                            <li className="cursor-pointer hover:text-green-600">Organic Staples</li>
                                            <li className="cursor-pointer hover:text-green-600">Fresh Juices</li>
                                        </ul>
                                    </div>
                                )}
                            </li>

                            <li>
                                <Link href="/blog" className="hover:text-green-600">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-green-600">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-green-600">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default NavLinksMobile