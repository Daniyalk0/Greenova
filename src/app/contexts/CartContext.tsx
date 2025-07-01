'use client';

import { createContext, useState, ReactNode } from 'react';

export const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addOrIncrease = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const remove = (productId) => {
    const filteredCart = cart.filter((item) => item.id !== productId);
    setCart(filteredCart);
  };

  const decrease = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity && item.quantity > 1 ? item.quantity - 1 : 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const addProductByQuantity = (product, quantity) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      return false;
    } else {
      setCart([...cart, { ...product, quantity }]);
      return true;
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addOrIncrease, remove, decrease, addProductByQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
