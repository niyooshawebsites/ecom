import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart_Slice",
  initialState: {
    productName: "",
    productPrice: "",
    productCategory: "",
    productQuantity: "",
  },

  reducers: {
    populateCart: (state, action) => {
      state.productName = action.payload.productName;
      state.productPrice = action.payload.productPrice;
      state.productCategory = action.payload.productCategory;
      state.productQuantity = action.payload.productQuantity;
    },
  },
});

export const cartSliceActions = cartSlice.actions;
const cartSliceReducers = cartSlice.reducer;
export default cartSliceReducers;
