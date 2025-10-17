'use client'
import { createClient } from "@supabase/supabase-js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data, error } = await supabase.from("Product").select("*");
    if (error) throw new Error(error.message);
      console.log('Fetched data:', data); 
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
state.items = action.payload as any;
    })
    .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;

    }).addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch products';
        state.loading = false;
    })
  },
});

export default productsSlice.reducer;