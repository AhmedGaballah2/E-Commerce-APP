import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cart";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
