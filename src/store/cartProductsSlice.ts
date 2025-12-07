"use client";
import { createClient } from "@supabase/supabase-js";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCart } from "@/lib/cartUtils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async (userId: number | null) => {
    if (userId) {
      // Logged-in user
      const { data, error } = await supabase
        .from("Cart")
        .select("*, Product(*)")
        .eq("userId", userId);

      if (error) throw new Error(error.message);
      // console.log('data in slice', data);
      
      return data || [];
    } else {
      // Guest user
      const cartData = getCart();
      return cartData;
    }
  }
);

interface CartState {
  loading: boolean;
  error: string | null;
   items: any[];
}

// ✅ Step 2: Create a properly typed initial state
const initialState: CartState = {
  items: [] as any,
  loading: false,
  error: null,
};

// ✅ Step 3: Create the slice
const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState, // ✅ just pass variable, don’t assign type here
  reducers: {
    setLocalCart: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload as any[]; // ✅ type assertion if needed
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});
export const { setLocalCart } = cartProductsSlice.actions;
export default cartProductsSlice.reducer;
