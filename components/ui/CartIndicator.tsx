"use client";

import { useEffect, useState } from "react";
import { openCart } from "@/src/store/cartPreviewUISlice";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";

type Props = {
  itemCount: number;
  totalPrice: number;
};

const CartBottomBadge = ({ itemCount, totalPrice }: Props) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  // Monitor scroll to show/hide badge on mobile
  useEffect(() => {
    const handleScroll = () => {
      // Threshold: Show after 150px of scrolling
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check for desktop (where it should always be visible)
    if (window.innerWidth >= 640) setIsVisible(true);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (itemCount <= 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-6 left-4  z-[2000] w-[90%] -translate-x-1/2 sm:left-10 sm:right-auto sm:w-auto sm:translate-x-0"
        >
          <div
            onClick={() => dispatch(openCart())}
            className="group flex cursor-pointer items-center justify-between overflow-hidden rounded-2xl bg-green-400 p-1.5 pr-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform active:scale-95 sm:rounded-full sm:p-2 sm:pr-6"
          >
            {/* LEFT SIDE: Icon & Count Badge */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-slate-900 transition-colors group-hover:bg-green-400 sm:h-12 sm:w-12 sm:rounded-full">
                <ShoppingCart className="h-5 w-5" strokeWidth={2.5} />
                
                {/* Count Indicator */}
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-700 text-[10px] font-dmsans_italic_light text-green-200 shadow-sm">
                  {itemCount}
                </span>
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-dmsans_semibold uppercase tracking-widest text-green-900 sm:text-[11px]">
                  Your Cart
                </span>
                <span className="text-sm font-dmsans_light text-green-900 sm:text-base">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* RIGHT SIDE: Action (Desktop + Mobile separation) */}
            <div className="ml-6 sm:ml-0  flex items-center gap-2">
              {/* <span className="hidden text-xs font-bold uppercase tracking-wider text-green-500 sm:inline-block">
                Checkout
              </span> */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-green-900 transition-transform group-hover:translate-x-1 sm:h-10 sm:w-10 sm:ml-10">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            {/* Glass Reflection Effect */}
            <div className="absolute inset-0 z-0 h-full w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartBottomBadge;