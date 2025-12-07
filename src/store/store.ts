import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './productsSlice'
import cartProductsReducer from './cartProductsSlice'
import wishlistReducer from './wishListSlice'
export const store = configureStore({reducer:{
    products:productsReducer,
    cartProducts: cartProductsReducer,
     wishlistProducts: wishlistReducer,
}})

export type RootState = ReturnType<typeof store.getState>;
export type  AppDispatch = typeof store.dispatch;