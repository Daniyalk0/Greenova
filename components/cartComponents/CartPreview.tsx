// components/cart/CartPreview.tsx
"use client";
import React from "react";
import { useSelector } from "react-redux";
import DesktopCartPreview from "./DesktopCartPreview";
import MobileCartPreview from "./MobileCartPreview";
import { RootState } from "@/src/store/store";


export default function CartPreview() {
   const isOpen = useSelector(
    (state: RootState) => state.cartUI.isCartOpen
  );

      React.useEffect(() => {
          if (isOpen) {
              document.body.style.overflow = "hidden";
              document.body.style.touchAction = "none"; // important for mobile
          } else {
              document.body.style.overflow = "";
              document.body.style.touchAction = "";
          }
  
          return () => {
              document.body.style.overflow = "";
              document.body.style.touchAction = "";
          };
      }, [isOpen]);

         const cartProducts = useSelector((state: RootState) => state.cartProducts.items);
         

  return (
    <div className="relative z-[2500]">
     <div className="hidden md:block">
        <DesktopCartPreview products={cartProducts}/>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileCartPreview products={cartProducts}/>
      </div>
    </div>
  );
}
