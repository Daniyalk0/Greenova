'use client';

import { createContext,useState, ReactNode } from 'react';

// 1. Define the product type
export interface Product {
  id: number | string;
  namee: string;
  image: string;
  price: number;
  quantity?: number;
  [key: string]: any; // allows flexibility
}

// 2. Define context value type
interface CartContextType {
  cart: Product[];
  setCart: (cart: Product[]) => void;
  addOrIncrease: (product: Product) => void;
  remove: (productId: number | string) => void;
  decrease: (productId: number | string) => void;
  addProductByQuantity: (product: Product, quantity: number) => boolean;
}

// 3. Create context with initial undefined value
export const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. Create provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addOrIncrease = (product: Product) => {
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

  const remove = (productId: number | string) => {
    const filteredCart = cart.filter((item) => item.id !== productId);
    setCart(filteredCart);
  };

  const decrease = (productId: number | string) => {
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

  const addProductByQuantity = (product: Product, quantity: number): boolean => {
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

// 3. Custom hook (optional)
// export const useCartContext = () => useContext(CartContext);
