"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { fetchWishlistProducts } from "@/src/store/wishListSlice";
import { RootState } from "@/src/store/store";

export default function WishlistSyncManager() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.wishlistProducts.loading);
  const error = useSelector((state: RootState) => state.wishlistProducts.error);

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(fetchWishlistProducts(Number(session.user.id)) as any);
    }
  }, [session, dispatch]);

  return null; 
}
