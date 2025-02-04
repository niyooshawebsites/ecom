import { createSlice } from "@reduxjs/toolkit";

const paymentMethodSlice = createSlice({
  name: "payment_Method_Slice",
  initialState: {
    online: false,
    offline: false,
  },

  reducers: {
    populatePaymentStatus: (state, action) => {
      state.online = action.payload.online;
      state.offline = action.payload.offline;
    },
  },
});

export const paymentMethodSliceActions = paymentMethodSlice.actions;

const paymentMethodSliceReducers = paymentMethodSlice.reducer;
export default paymentMethodSliceReducers;
