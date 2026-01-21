"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartSource = "local" | "db" | null;



interface CartState {
  items: any[];
  source: CartSource;
}

const initialState: CartState = {
  items: [],
  source: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(
      state,
      action: PayloadAction<{
        items: any[];
        source: CartSource;
      }>
    ) {
      state.items = action.payload.items;
      state.source = action.payload.source;
    },

    clearCart(state) {
      state.items = [];
      state.source = null;
    },

    updateCartItems(state, action: PayloadAction<any[]>) {
      // Used when user adds/removes items
      state.items = action.payload;
    },
  },
});

export const { setCart, clearCart, updateCartItems } = cartSlice.actions;
export default cartSlice.reducer;
