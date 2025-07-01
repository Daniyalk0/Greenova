"use client";

import React, { useContext, useEffect, useState, MouseEvent } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/contexts/CartContext";

type Product = {
  id: number;
  namee: string;
  price: number;
  image: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useContext(AuthContext);
  const { cart, addOrIncrease } = useContext(CartContext);
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isInCart = cart.some((item: Product) => item.id === product.id);
    setIsAlreadyInCart(isInCart);
  }, [cart, product.id]); // ✅ Corrected dependency (was [isUser] — wrong)

  const handleAddToCart = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent navigating to product page

    if (!user) {
      router.push("/login");
    } else {
      addOrIncrease(product);
    }
  };

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="w-[90%] md:w-[95%] cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
    >
      <div
        className="absolute cursor-pointer left-3 top-3 bg-zinc-200 p-1 rounded-md"
        onClick={handleAddToCart}
      >
        {isAlreadyInCart && user ? (
          <Check className="text-green-600 w-5" />
        ) : (
          <ShoppingBag className="text-cyan-800 w-5" />
        )}
      </div>

      <img
        src={product.image}
        alt={product.namee}
        className="w-[60%] aspect-square mt-8 object-contain mx-auto"
      />

      <div className="p-4">
        <h2 className="font-playfair text-xl md:text-2xl font-extrabold text-cyan-900">
          {product.namee}
        </h2>
        <div className="flex items-center justify-between mt-2 md:text-md">
          <p className="text-slate-600 font-bold mt-1">
            ₹{product.price.toFixed(2)}
          </p>
          <p className="bg-cyan-200 rounded-lg px-2 text-cyan-600">Fruit</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
