import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "@/lib/supabaseClient";
import { fetchCartProducts } from "@/src/store/cartProductsSlice";
// import { fetchCartProducts } from "@/redux/cartSlice";

export function useCartSync(session) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!session?.user?.id) return;

    // Fetch once when user logs in
    dispatch(fetchCartProducts(session.user.id));

    // Subscribe to realtime updates
    const channel = supabase
      .channel("cart-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Cart",
          filter: `userId=eq.${session.user.id}`,
        },
        () => dispatch(fetchCartProducts(session.user.id))
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id]);
}
