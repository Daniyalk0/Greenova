"use client";

import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Plus, Minus, Trash } from "lucide-react";
import { CartContext } from "@/app/contexts/CartContext";
import React from "react";
import Link from "next/link";

type CartItem = {
  id: number;
  namee: string;
  image: string;
  price: number;
  quantity: number;
};

const Cart = () => {
  const pathname = usePathname();

  const {
    cart,
    remove,
    addOrIncrease,
    decrease,
  }: {
    cart: CartItem[];
    remove: (id: number) => void;
    addOrIncrease: (item: CartItem) => void;
    decrease: (id: number) => void;
  } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="w-full px-4 py-6 font-playfair">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

        {cart?.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-row sm:items-center justify-between border-b py-4 gap-4"
            >
              <Link className="flex items-center gap-4" href={`/product/${item?.id}`}>
                <img
                
                  src={item.image}
                  alt={item.namee}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-bold">{item.namee}</h2>
                  <p className="text-sm text-gray-600">
                    Price: <strong>₹{item.price}</strong>
                  </p>
                </div>
              </Link>

              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-2 border px-0 py-1 rounded">
                  <button
                    onClick={() => decrease(item.id)}
                    className="text-gray-600 hover:text-black"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => addOrIncrease(item)}
                    className="text-gray-600 hover:text-black"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="font-semibold text-lg">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => remove(item.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))
        )}

        {/* Total Price */}
        {cart?.length > 0 && (
          <div className="flex justify-end mt-8">
            <h2 className="text-xl font-semibold">
              Total: ₹
              {cart
                .reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

