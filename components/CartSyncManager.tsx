"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { setCart } from "@/src/store/cartProductsSlice";
import { clearCartLocalStorage, getCartFromLocalStorage} from "@/lib/cartUtils";
import { getCartItemsFromSupabase, syncLocalCartToSupabase } from "../src/app/actions/cart";

export default function CartSyncManager() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "loading") return;

    // -------------------------
    // 👥 GUEST USER
    // -------------------------
    if (!session?.user?.id) {
      const localCart = getCartFromLocalStorage();

      dispatch(
        setCart({
          items: localCart,
          source: localCart.length ? "local" : null,
        })
      );

      return;
    }

    // -------------------------
    // 👤 AUTH USER
    // -------------------------
    const initCart = async () => {
      const localCart = getCartFromLocalStorage();

      // 🔁 Sync once: guest → auth
      if (localCart.length > 0) {
        await syncLocalCartToSupabase(session.user.id, localCart);
        clearCartLocalStorage();
      }

      const dbCart = await getCartItemsFromSupabase(session.user.id);

      dispatch(
        setCart({
          items: dbCart,
          source: dbCart.length ? "db" : null,
        })
      );
    };

    initCart();
  }, [status]);

  return null;
}
