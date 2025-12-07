"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useState } from 'react'
import NavLinks from './NavLinksMobile'
import NavCart from './NavCart'
import UserMenu from './UserMenu'
import SearchWithPopup from './SearchWithPopup'
import NavDesktopLinks from './NavDesktopLinks'
import { Heart } from 'lucide-react'
import NavHeart from './NavHeart'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type UserMenuProps = {
    data: any; // refine later to actual User type
    itemCount: number | null;
    likedItemCount: number | null;
    setDrawerOpen: (open: boolean) => void;
};



const DesktopNav = ({ itemCount, likedItemCount, data, setDrawerOpen }:
    UserMenuProps) => {
    const [isShopOpen, setIsShopOpen] = useState(false)
    const { data: session } = useSession()
    const router = useRouter();
    return (

        <nav className="z-[2000] sticky top-0 bg-white font-playfair py-2 flex items-center w-full">

            <div className="mx-auto w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between font-dmsans_semibold text-sm">

                {/* Left: Logo */}
                <Link href="/" className="font-bold text-cyan-700 flex-shrink-0 pb-4">
                    <Image
                        src={'/logo.png'}
                        width={100}
                        height={100}
                        className="w-[7rem] lg:w-[8rem] xl:w-[9rem]"
                        alt="logo"
                    />
                </Link>

                {/* Center: Links */}
                <NavDesktopLinks isShopOpen={isShopOpen} setIsShopOpen={setIsShopOpen} />
                {/* Right: Search + Cart*/}
                <div className="flex items-center justify-end gap-8 max-w-fit">
                    <SearchWithPopup />

                    <div className="flex items-center gap-6">

                        <div
                            onClick={() => {
                                if (!session?.user) {
                                    router.push('/login');
                                    return; // 🔥 stop execution so drawer doesn't open
                                } else {


                                    setDrawerOpen(true);
                                    console.log('clicked!!');
                                }
                            }}
                        >
                            <NavHeart LikedItemCount={likedItemCount} />
                        </div>


                        {/* Cart */}
                        <Link href={'/cart'}>
                            <NavCart itemCount={itemCount} />
                        </Link>

                        {/* Auth */}
                        <UserMenu user={data?.user} />
                    </div>
                </div>
            </div>



        </nav>



    )
}

export default DesktopNav