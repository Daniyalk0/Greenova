// store/cartPreviewUIReducer.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
};

const cartPreviewUIReducer = createSlice({
  name: "cartUI",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { openCart, closeCart } = cartPreviewUIReducer.actions;
export default cartPreviewUIReducer.reducer;
