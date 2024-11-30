import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart_Slice",

  initialState: {
    cartProduct: {
      productName: "",
      productPrice: "",
      productCategory: "",
      productQuantity: "",
    },
    cartProductList: [],
  },

  reducers: {
    populateCartProduct: (state, action) => {
      state.cartProduct.productName = action.payload.productName;
      state.cartProduct.productPrice = action.payload.productPrice;
      state.cartProduct.productCategory = action.payload.productCategory;
      state.cartProduct.productQuantity = action.payload.productQuantity;
    },

    populateCartList: (state, action) => {
      state.cartProductList = action.payload.cartProductList;
    },
  },
});

export const cartSliceActions = cartSlice.actions;

const cartSliceReducers = cartSlice.reducer;
export default cartSliceReducers;
