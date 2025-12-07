"use client";
import { createClient } from "@supabase/supabase-js";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ Async thunk to fetch wishlist items
export const fetchWishlistProducts = createAsyncThunk(
  "wishlist/fetchWishlistProducts",
  async (userId: number | null) => {
    if (!userId) return []; // Wishlist only for logged-in users

    const { data, error } = await supabase
      .from("Wishlist")
      .select("*, Product(*)")
      .eq("userId", userId);

    if (error) throw new Error(error.message);

    return data || [];
  }
);

interface WishlistState {
  loading: boolean;
  error: string | null;
  items: any[];
}

// ✅ Initial state
const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

// ✅ Slice
const wishlistSlice = createSlice({
  name: "wishlistProducts",
  initialState,
  reducers: {
    setLocalWishlist: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    addWishlistItem: (state, action: PayloadAction<any>) => {
      // Optional: prevent duplicates in local state
      const exists = state.items.find(item => item.productId === action.payload.productId);
      if (!exists) state.items.push(action.payload);
    },
    removeWishlistItemm: (state, action: PayloadAction<number>) => {
      // Remove by productId
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload as any[];
      })
      .addCase(fetchWishlistProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch wishlist items";
      });
  },
});

export const { setLocalWishlist, addWishlistItem, removeWishlistItemm} = wishlistSlice.actions;
export default wishlistSlice.reducer;
