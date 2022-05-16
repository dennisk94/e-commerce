import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from './cart';

const store = configureStore({
    reducer: {
        cart: cartSliceReducer
    }
});

export default store;