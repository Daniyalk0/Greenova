"use client";

import {useRef, useState } from "react";
import { Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import UserProfilePopUp from "./UserProfilePopUp";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();
  console.log(data);



  const togglePfp = () => setIsOpen((prev) => !prev);

  const name = data?.user?.name || "U";
  const firstLetter = name[0].toUpperCase();

  // Use OAuth image if available, otherwise generate a fallback image URL
  const avatarUrl =
    data?.user?.image ||
    `https://ui-avatars.com/api/?name=${firstLetter}&background=random&size=128`;


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-playfair">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16  ">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-cyan-700">
              Greenova
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-8">
            {/* <Link href="/" className="  relative">
              <div
                className={`
                 transition-all duration-300 cursor-pointer relative`}
              >
                <LuShoppingCart className="text-[1.5rem] md:text-[3vw] xl:text-[1.5vw] 2xl:text-[1.3vw]" />

                <h2 className="absolute flex items-center -right-3 -top-3 px-2 py-0 justify-center text-md bg-zinc-900 text-white rounded-full">
                  <p>0</p>
                </h2>

              </div>
           
            </Link> */}
            {!data && (
              <Link
                href="/login"
                className="block text-gray-700 hover:text-indigo-600"
              >
                Login
              </Link>
            )}
               <Link
                href="/"
                className="block text-gray-700 hover:text-indigo-600"
              >
                <Home />
              </Link>
            {/* Avatar */}
            {data && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center cursor-pointer" >

                <img
                  src={avatarUrl}
                  onClick={togglePfp}
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <UserProfilePopUp isProfileOpen={isOpen} setIsProfileOpen={setIsOpen} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* {isOpen && (
        <div
          ref={navRef}
          className="md:hidden absolute w-full bg-white shadow-lg px-4 py-4 space-y-2"
        >
          <Link
            href="/cart"
            className="relative"
            onClick={() => setIsOpen(false)}
          >
            <div className="transition-all duration-300 cursor-pointer relative">
              <LuShoppingCart className="md:text-[3vw] xl:text-[1.5vw] 2xl:text-[1.3vw]" />
              <h2 className="absolute flex items-center left-3 -top-3 px-1 py-0 justify-center text-sm bg-zinc-900 text-white rounded-full">
                <p>0</p>
              </h2>
            </div>
          </Link>
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-indigo-600"
          >
            Home
          </Link>

        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
