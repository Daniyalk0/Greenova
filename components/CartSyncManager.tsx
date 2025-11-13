"use client";

import { handleCartSyncOnLogin } from "@/lib/syncCart";
import { getCartItemsFromSupabase } from "@/src/app/actions/cart";
import { fetchCartProducts } from "@/src/store/cartProductsSlice";
import { AppDispatch } from "@/src/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCartProducts } from "@/redux/features/cartSlice";
// import { getCartItemsFromSupabase } from "@/actions/cartActions";
// import { handleCartSyncOnLogin } from "@/lib/cartUtils";

export default function CartSyncManager() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  // Sync local cart on login
  useEffect(() => {
    const syncLocalCart = async () => {
      if (!userId) return;

      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (localCart.length > 0) {
        console.log("🔁 Syncing local cart for user:", userId);
        await handleCartSyncOnLogin(Number(userId)); // Push local -> Supabase
        dispatch(fetchCartProducts(userId)); // Then re-fetch updated data
        localStorage.removeItem("cart");
      }
    };
    syncLocalCart();
  }, [userId, dispatch]);

  // 2️⃣ Always fetch cart when user logs in or reloads
  useEffect(() => {
    if (!userId) return;
    dispatch(fetchCartProducts(userId)); // ✅ only this, no manual fetch
  }, [userId, dispatch]);

  return null;
}
