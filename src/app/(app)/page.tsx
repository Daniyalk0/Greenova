'use client';

import React, { useEffect } from 'react';
// import Home from './(homePage)/Home';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../store/productsSlice';
// import { AppDispatch, RootState } from '../store/store';
import { useSession } from 'next-auth/react';
import { fetchProducts } from '@/src/store/productsSlice';
import { AppDispatch } from '@/src/store/store';
import Home from './(homePage)/Home';
// import { fetchProducts } from '../store/productsSlice';

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, status } = useSession();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, session?.user?.id]);



  useEffect(() => {
    if (!localStorage.getItem("sessionId")) {
      const id = Math.random().toString(36).substring(2, 12);
      localStorage.setItem("sessionId", id);
    }
  }, []);


  // useEffect(() => {
  //   const syncLocalCart = async () => {
  //     if (!userId) return;

  //     const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

  //     if (Array.isArray(localCart) && localCart.length > 0) {
  //       console.log("🔁 Syncing local cart for user:", userId);

  //      handleCartSyncOnLogin(Number(session.user.id));
        
  //       // ✅ Optionally sync to backend
  //       dispatch(fetchCartProducts(localCart));

  //       // ✅ Clear local cart after sync
  //       localStorage.removeItem("cart");
  //     }
  //   };

  //   syncLocalCart();
  // }, [session?.user?.id, dispatch]);


  // useEffect(() => {
  //   // Only run when we have a userId
  //   if (!userId) return;

  //   const fetchCart = async () => {
  //     try {
  //       // 1️⃣ Fetch cart items from Supabase (server action)
  //       const cartData = await getCartItemsFromSupabase(userId);

  //       // 2️⃣ Update Redux store
  //       if (cartData) {
  //         console.log('cartDataa', cartData);
          
  //         dispatch(fetchCartProducts(cartData));
  //         console.log("✅ Cart fetched & stored in Redux:", cartData);
  //       } else {
  //         dispatch(fetchCartProducts([]));
  //         console.log("⚠️ Empty cart");
  //       }
  //     } catch (error) {
  //       console.error("❌ Failed to fetch cart:", error);
  //     }
  //   };

  //   fetchCart();
  // }, [userId, dispatch]); // ✅ Runs on mount & whenever userId changes



  return <Home />;
};

export default Page;
