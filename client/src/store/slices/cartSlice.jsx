import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart_Slice",

  initialState: {
    cartProduct: {
      productId: null,
      productName: null,
      productPrice: null,
      productCategory: null,
      productCid: null,
      productQuantity: null,
      productTotalAmount: null,
      length: null,
      breadth: null,
      height: null,
      weight: null,
    },
    cartProductList: [],
  },

  reducers: {
    populateCartProduct: (state, action) => {
      state.cartProduct.productId = action.payload.productId;
      state.cartProduct.productName = action.payload.productName;
      state.cartProduct.productPrice = action.payload.productPrice;
      state.cartProduct.productCategory = action.payload.productCategory;
      state.cartProduct.productCid = action.payload.productCid;
      state.cartProduct.productQuantity = action.payload.productQuantity;
      state.cartProduct.productTotalAmount = action.payload.productTotalAmount;
      state.cartProduct.length = action.payload.length;
      state.cartProduct.breadth = action.payload.breadth;
      state.cartProduct.height = action.payload.height;
      state.cartProduct.weight = action.payload.weight;
    },

    populateCartList: (state, action) => {
      state.cartProductList = action.payload.cartProductList;
    },
  },
});

export const cartSliceActions = cartSlice.actions;

const cartSliceReducers = cartSlice.reducer;
export default cartSliceReducers;
