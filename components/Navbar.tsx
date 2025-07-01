"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { AuthContext } from "@/app/contexts/AuthContext";
import { CartContext } from "@/app/contexts/CartContext";

const Navbar = (): JSX.Element => {
  const { user, logoutUser } = useContext(AuthContext) as {
    user: { email: string } | null;
    logoutUser: () => void;
  };

  const { cart } = useContext(CartContext) as {
    cart: {
      id: number;
      namee: string;
      image: string;
      price: number;
      quantity: number;
    }[];
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-playfair">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-cyan-700">
              BrandName
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={logoutUser}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md"
              >
                Logout
              </button>
            )}

            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <div
                className={`${
                  user ? "opacity-100" : "opacity-0 pointer-events-none"
                } transition-all duration-300 cursor-pointer relative`}
              >
                <LuShoppingCart className="md:text-[3vw] xl:text-[1.5vw] 2xl:text-[1.3vw]" />
                <h2 className="absolute flex items-center -right-3 -top-3 px-2 py-0 justify-center text-md bg-zinc-900 text-white rounded-full">
                  <p>{cart?.length}</p>
                </h2>
              </div>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={navRef}
          className="md:hidden bg-white shadow-lg px-4 py-4 space-y-2"
        >
          {user && (
            <Link
              href="/cart"
              className={`relative`}
              onClick={() => setIsOpen(false)}
            >
              <div className="transition-all duration-300 cursor-pointer relative">
                <LuShoppingCart className="md:text-[3vw] xl:text-[1.5vw] 2xl:text-[1.3vw]" />
                <h2 className="absolute flex items-center left-3 -top-3 px-1 py-0 justify-center text-sm bg-zinc-900 text-white rounded-full">
                  <p>{cart?.length}</p>
                </h2>
              </div>
            </Link>
          )}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-indigo-600"
          >
            Home
          </Link>

          {!user ? (
            <>
              <Link
                onClick={() => setIsOpen(false)}
                href="/login"
                className="block text-gray-700 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href="/signup"
                className="block text-gray-700 hover:text-indigo-600"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logoutUser();
                setIsOpen(false);
              }}
              className="block text-red-600 hover:text-red-700 w-full text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
