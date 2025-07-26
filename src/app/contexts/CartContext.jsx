"use client";

import { createContext, useEffect, useState } from "react";
import { addOrIncreaseQuantity as addByQuantityUtil } from "../CartUtils";
import { decreaseQuantity as decreaseQuantityUtil } from "../CartUtils";
import { removeProduct as removeProductUtil } from "../CartUtils";

export const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [isHydrated, setIsHydrated] = useState(false); // 🟡 Add hydration flag

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setIsHydrated(true); // ✅ Hydrated now
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isHydrated]);
  

  const remove = (product) => {
    setCart(() => removeProductUtil(cart, product))
  };

  const decrease = (product) => {
    setCart(() => decreaseQuantityUtil(product, cart));
  };

  const addOrIncreaseProducts = (product, givenquantity) => {
    setCart(() => addByQuantityUtil(cart, givenquantity, product));
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, remove, decrease, addOrIncreaseProducts, isHydrated  }}
    >
      {children}
    </CartContext.Provider>
  );
};
