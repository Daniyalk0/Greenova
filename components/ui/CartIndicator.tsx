"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  itemCount: number;
  totalPrice: number;
};

const CartBottomBadge = ({ itemCount, totalPrice }: Props) => {
  if (itemCount <= 0) return null;

  return (
    <Link href="/cart" >
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="
          fixed bottom-3 left-3 right-3 z-[999]
          sm:left-auto sm:right-4 sm:w-auto cursor-pointer
        "
      >
        {/* Badge container */}
        <div
          className="
    flex items-center justify-between
    rounded-2xl
    bg-green-300  sm:bg-green-400 px-4 py-2 md:px-1 md:py-1 mx-1
    shadow-[0_14px_60px_rgba(84,180,60,0.82)]
    sm:px-3 sm:py-1.5
  "
        >


          {/* MOBILE CONTENT */}
          <div className="flex items-center gap-3 sm:hidden">
            <ShoppingCart className="h-9 w-9 rounded-xl text-gray-900 bg-green-200 p-2 " />

            <div className="flex flex-col leading-tight">
              <span className="text-sm text-gray-900 font-monasans_semibold">
                {itemCount} items
              </span>
              <span className="text-xs text-gray-600">
                ₹{totalPrice}
              </span>
            </div>
          </div>

          {/* DESKTOP CONTENT */}
          <div className="hidden sm:flex items-center p-1 rounded-xl shadow-sm group hover:shadow-md transition-all duration-300">
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
            {/* Modern Icon Badge */}
            <div className="bg-gray-900 text-white flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-monasans_semibold text-md">
              <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2.5} />
              <span className="text-[11px] font-bold tracking-tighter uppercase">{itemCount}</span>
            </div>

            {/* Price Display */}
            <div className="px-3">
              <span className="text-[13px] text-gray-900 font-monasans_medium tracking-tight font-monasans_semibold text-md">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* GO TO CART (mobile only) */}
          <Link
            href="/cart"
            className="
              sm:hidden flex items-center gap-1
              text-sm text-green-700 font-monasans_semibold
            "
          >
            View
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
    </Link>
  );
};

export default CartBottomBadge;
