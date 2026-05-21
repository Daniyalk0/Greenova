"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { getWishlistDB } from "@/src/app/actions/like";
import { setWishlist } from "@/src/store/wishListSlice";

export default function WishlistSyncManager() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const syncWishlist = async () => {
      // Guest user → loaded but empty
      if (!session?.user?.id) {
        dispatch(
          setWishlist({
            items: [],
          })
        );

        return;
      }

      try {
        const data = await getWishlistDB(
          session.user.id
        );

        dispatch(
          setWishlist({
            items: data || [],
          })
        );
      } catch (error) {
        console.error(
          "Wishlist sync failed:",
          error
        );

        // Prevent infinite skeleton
        dispatch(
          setWishlist({
            items: [],
          })
        );
      }
    };

    syncWishlist();
  }, [session?.user?.id, dispatch]);

  return null;
}
