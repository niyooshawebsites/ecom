import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart_Slice",

  initialState: {
    cartProduct: {
      productName: null,
      productPrice: null,
      productCategory: null,
      productQuantity: null,
      productTotalAmount: null,
    },
    cartProductList: [],
  },

  reducers: {
    populateCartProduct: (state, action) => {
      state.cartProduct.productName = action.payload.productName;
      state.cartProduct.productPrice = action.payload.productPrice;
      state.cartProduct.productCategory = action.payload.productCategory;
      state.cartProduct.productQuantity = action.payload.productQuantity;
      state.cartProduct.productTotalAmount = action.payload.productTotalAmount;
    },

    populateCartList: (state, action) => {
      state.cartProductList = action.payload.cartProductList;
    },
  },
});

export const cartSliceActions = cartSlice.actions;

const cartSliceReducers = cartSlice.reducer;
export default cartSliceReducers;
