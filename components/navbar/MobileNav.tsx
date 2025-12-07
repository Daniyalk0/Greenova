"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import NavLinksMobile from './NavLinksMobile';
import NavCart from './NavCart';
import UserMenu from './UserMenu';
import SearchWithPopup from './SearchWithPopup';
import NavHeart from './NavHeart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type UserMenuProps = {
    data: any; // refine later to actual User type
    itemCount: number | null;
    likedItemCount: number | null;
    setDrawerOpen: (open: boolean) => void;
};


const MobileNav = ({ itemCount, likedItemCount, data, setDrawerOpen }:
    UserMenuProps) => {
    const [isOpen, setIsOpen] = useState(true)
    const { data: session } = useSession()
    const router = useRouter();
    return (


        <nav className="z-[2000] shadow-md sticky top-0  font-playfair bg-white pt-2 flex items-center w-full">

            <div className="mx-auto w-full px-4 sm:px-6 lg:px-12 font-dmsans_semibold text-sm py-2">
                <div className=' flex items-center justify-between '>
                    <div className='flex items-center w-fit gap-2'>

                        <NavLinksMobile />
                        {/* Left: Logo */}
                        <Link href="/" className="font-bold text-cyan-700 flex-shrink-0 pb-2">
                            <Image
                                src={'/logo.png'}
                                width={100}
                                height={100}
                                className="w-[6rem] lg:w-[8rem] xl:w-[9rem]"
                                alt="logo"
                            />
                        </Link>
                    </div>


                    {/* Center: Links */}


                    {/* Right: Search + Cart*/}
                    <div className="flex items-center justify-end gap-5 max-w-fit">
                        <SearchWithPopup />
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

export default MobileNav