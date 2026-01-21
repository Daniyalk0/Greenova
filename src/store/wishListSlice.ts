"use client";
import { createClient } from "@supabase/supabase-js";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartSource } from "./cartProductsSlice";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// // ✅ Async thunk to fetch wishlist items
// export const fetchWishlistProducts = createAsyncThunk(
//   "wishlist/fetchWishlistProducts",
//   async (userId: number | null) => {
//     if (!userId) return []; // Wishlist only for logged-in users

//     const { data, error } = await supabase
//       .from("Wishlist")
//       .select("*, Product(*)")
//       .eq("userId", userId);

//     if (error) throw new Error(error.message);

//     return data || [];
//   }
// );

interface WishlistState {
  items: any[];
}

// ✅ Initial state
const initialState: WishlistState = {
  items: [],
};

// ✅ Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<{ items: any[] }>) => {
      state.items = action.payload.items;
    },
  },

});

export const { setWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;
