import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducers from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    cart_Slice: cartSliceReducers,
  },
});

export default store;
