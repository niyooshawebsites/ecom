import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducers from "./slices/cartSlice";
import userSliceReducers from "./slices/userSlice";

const store = configureStore({
  reducer: {
    cart_Slice: cartSliceReducers,
    user_Slice: userSliceReducers,
  },
});

export default store;
