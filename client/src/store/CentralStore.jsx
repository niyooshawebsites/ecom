import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducers from "./slices/cartSlice";
import userSliceReducers from "./slices/userSlice";
import filterSliceReducers from "./slices/filterSlice";
import sortSliceReducers from "./slices/sortSlice";
import paymentMethodSliceReducers from "./slices/paymentMethodSlice";
import customizationSliceReducers from "./slices/customizationSlice";

const store = configureStore({
  reducer: {
    cart_Slice: cartSliceReducers,
    user_Slice: userSliceReducers,
    filter_Slice: filterSliceReducers,
    sort_Slice: sortSliceReducers,
    payment_Method_Slice: paymentMethodSliceReducers,
    customization_Slice: customizationSliceReducers,
  },
});

export default store;
