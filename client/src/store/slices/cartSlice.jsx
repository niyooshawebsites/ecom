import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart_Slice",

  initialState: {
    cartProduct: {
      productId: null,
      productName: null,
      productPrice: null,
      productCategory: null,
      productQuantity: null,
      productTotalAmount: null,
    },
    cartProductList: [],
    cartGrossTotal: 0,
    cartDiscount: {
      discountAmount: 0,
      couponCode: null,
      couponDesc: null,
    },
    cartNetTotal: 0,
  },

  reducers: {
    populateCartProduct: (state, action) => {
      state.cartProduct.productId = action.payload.productId;
      state.cartProduct.productName = action.payload.productName;
      state.cartProduct.productPrice = action.payload.productPrice;
      state.cartProduct.productCategory = action.payload.productCategory;
      state.cartProduct.productQuantity = action.payload.productQuantity;
      state.cartProduct.productTotalAmount = action.payload.productTotalAmount;
    },

    populateCartList: (state, action) => {
      state.cartProductList = action.payload.cartProductList;
    },

    populateCartGrossTotal: (state, action) => {
      state.cartGrossTotal = action.payload.cartGrossTotal;
    },

    populateCartDiscount: (state, action) => {
      state.cartDiscount.discountAmount = action.payload.discountAmount;
      state.cartDiscount.couponCode = action.payload.couponCode;
      state.cartDiscount.couponDesc = action.payload.couponDesc;
    },

    populateCartNetTotal: (state, action) => {
      state.cartNetTotal = action.payload.cartNetTotal;
    },
  },
});

export const cartSliceActions = cartSlice.actions;

const cartSliceReducers = cartSlice.reducer;
export default cartSliceReducers;
