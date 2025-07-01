"use client";

import React, { useContext, useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
// import items from "@/data";
import { CartContext } from "../src/app/contexts/CartContext";
import { AuthContext } from "../src/app/contexts/AuthContext";
import items from "../src/data";
// import { CartContext } from "@/app/contexts/CartContext";
// import { AuthContext } from "@/app/contexts/AuthContext";

const ProductDetails = ({ id }) => {
  const [Products] = useState(items);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAlreadyInCart, setisAlreadyInCart] = useState(false);

  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);

   const pathname = usePathname();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  

  const { cart, addProductByQuantity } = cartContext || {
    cart: [],
    addProductByQuantity: () => {},
  };

  const { user } = authContext || { user: null };

  const router = useRouter();

  // Load product based on ID
  useEffect(() => {
    if (id) {
      const current = Products.find(
        (item) => item.id.toString() === id.toString()
      );
      setProduct(current || null);
    }
  }, [id, Products]);

  // Check if product is already in cart
  useEffect(() => {
    if (product) {
      const isInCart = cart.some((item) => item.id === product.id);
      setisAlreadyInCart(isInCart);
    }
  }, [cart, product]);

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!product) return;

    const isInCart = cart.some((item) => item.id === product.id);

    if (isInCart) {
      setisAlreadyInCart(true);
      alert("Product is already in your cart!");
    } else {
      addProductByQuantity(product, quantity);
      setisAlreadyInCart(true);
      alert("Product added to cart!");
    }
  };

  if (!product) {
    return (
      <div className="w-full text-center py-12 text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-3xl flex-col md:flex-row items-start mx-auto bg-white shadow rounded-lg p-4 md:p-6 flex md:items-center justify-start gap-0">
        {/* Product Image */}
        <div className="md:w-[30vw] w-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.namee}
            className="w-full rounded"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">{product.namee}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-bold text-green-700">₹{product.price}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="font-medium">Quantity:</span>
            <div
              className={`flex items-center gap-2 border px-3 py-1 rounded ${
                isAlreadyInCart ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <button
                onClick={() =>
                  setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                }
                disabled={isAlreadyInCart || quantity <= 1}
                className="text-gray-600 hover:text-black disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                disabled={isAlreadyInCart}
                className="text-gray-600 hover:text-black disabled:cursor-not-allowed"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAlreadyInCart}
            className={`mt-4 px-6 py-2 rounded w-fit transition ${
              isAlreadyInCart
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isAlreadyInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
