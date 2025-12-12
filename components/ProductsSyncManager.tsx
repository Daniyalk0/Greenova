"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/src/store/productsSlice";
import { RootState } from "@/src/store/store";

export default function ProductsSyncManager() {
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  return null;
}
