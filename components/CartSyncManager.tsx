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
    if (userId) {
      // Auth user: sync localStorage -> DB, then fetch cart
      const syncLocalCart = async () => {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (localCart.length > 0) {
          console.log("🔁 Syncing local cart for user:", userId);
          await handleCartSyncOnLogin(Number(userId)); // push local -> DB
          localStorage.removeItem("cart");
        }
        dispatch(fetchCartProducts(Number(userId))); // fetch DB cart
      };
      syncLocalCart();
    } else {
      // Guest user: just fetch localStorage cart
      const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(fetchCartProducts(null)); // or dispatch guestCart directly if thunk allows
    }
  }, [userId, dispatch]);

  // 2️⃣ Always fetch cart when user logs in or reloads
  // useEffect(() => {
  //   if (!userId) return;
  //   dispatch(fetchCartProducts(Number(userId))); 
  // }, [userId, dispatch]);

  return null;
}
