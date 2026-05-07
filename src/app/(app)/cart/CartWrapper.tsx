"use client";

import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store/store";
import { setCart } from "@/src/store/cartProductsSlice";
import { toast } from "react-toastify";
import { addToCartUtil } from "@/lib/addToCartUtil";
import CartView from "./CartView";
import { removeCartItem } from "../../actions/cart";
import CartSkeleton from "./CartSkeleton";
import { useEffect, useState } from "react";

export default function CartWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();

 const cart = useSelector(
  (state: RootState) => state.cartProducts.items
);

// 🚫 block until real data comes
if (cart === null) {
  return <CartSkeleton />;
}

  const handleAddToCart = async (product: any, weight: any) => {
    const result = await addToCartUtil({
      product,
      weight,
      cart,
      session,
      dispatch,
    });

    if (!result) return;

    if (result.type === "error") toast.error(result.message);
    if (result.type === "already-exists") toast.info(result.message);
  };

  const handleRemoveProduct = async (
    productId: number,
    weight: number
  ): Promise<void> => {
    const previous = [...cart];

    const updated = previous.filter(
      (item) => !(item.productId === productId && item.weight === weight)
    );

    dispatch(
      setCart({
        items: updated,
        source: session?.user?.id ? "db" : "local",
      })
    );

    try {
      if (session?.user?.id) {
        await removeCartItem(session.user.id, productId, weight);
      } else {
        localStorage.setItem("cart", JSON.stringify(updated));
      }
    } catch {
      dispatch(
        setCart({
          items: previous,
          source: session?.user?.id ? "db" : "local",
        })
      );
    }
  };

  return (
    <CartView
      cart={cart}
      onRemove={handleRemoveProduct}
      onAdd={handleAddToCart}
    />
  );
}