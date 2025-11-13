'use client'
import { createClient } from "@supabase/supabase-js";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/lib/cartUtils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async (userId: string | number) => {
    if (!userId) throw new Error("User ID is required to fetch cart products.");

    const { data, error } = await supabase
      .from("Cart")
      .select("*")
      .eq("userId", userId); // ✅ fetch only user-specific items

    if (error) throw new Error(error.message);

    console.log("Fetched user cart:", data);
    return data;
  }
);

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

// ✅ Step 2: Create a properly typed initial state
const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// ✅ Step 3: Create the slice
const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState, // ✅ just pass variable, don’t assign type here
  reducers: {
    setLocalCart: (state, action: PayloadAction<CartItem[]>) => {
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
        state.items = action.payload as CartItem[]; // ✅ type assertion if needed
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});
export const { setLocalCart } = cartProductsSlice.actions;
export default cartProductsSlice.reducer;