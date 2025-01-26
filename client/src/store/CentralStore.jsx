import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducers from "./slices/cartSlice";
import userSliceReducers from "./slices/userSlice";
import filterSliceReducers from "./slices/filterSlice";
import sortSliceReducers from "./slices/sortSlice";

const store = configureStore({
  reducer: {
    cart_Slice: cartSliceReducers,
    user_Slice: userSliceReducers,
    filter_Slice: filterSliceReducers,
    sort_Slice: sortSliceReducers,
  },
});

export default store;
