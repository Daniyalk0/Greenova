import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './productsSlice'
import cartProductsReducer from './cartProductsSlice'
import wishlistReducer from './wishListSlice'
import cartPreviewUIReducer from "./cartPreviewUISlice";
import locationReducer from "./locationSlice";

export const store = configureStore({reducer:{
    products:productsReducer,
    cartProducts: cartProductsReducer,
     wishlist: wishlistReducer,
      cartUI: cartPreviewUIReducer,
          location: locationReducer,
}})

export type RootState = ReturnType<typeof store.getState>;
export type  AppDispatch = typeof store.dispatch;