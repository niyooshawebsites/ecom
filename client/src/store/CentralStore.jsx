import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducers from "./slices/cartSlice";
import userSliceReducers from "./slices/userSlice";
import filterSliceReducers from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    cart_Slice: cartSliceReducers,
    user_Slice: userSliceReducers,
    filter_Slice: filterSliceReducers,
  },
});

export default store;
