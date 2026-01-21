"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { getWishlistDB } from "@/src/app/actions/like";
import { setWishlist } from "@/src/store/wishListSlice";

export default function WishlistSyncManager() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!session?.user?.id) return;

    const syncWishlist = async () => {
      const data = await getWishlistDB(session?.user?.id);
      if (data) {
        dispatch(
          setWishlist({
            items: data,

          }),
        );
      }
    };

    syncWishlist();
  }, [session?.user?.id]);

  return null;
}
