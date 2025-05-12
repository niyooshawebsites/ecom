import { createSlice } from "@reduxjs/toolkit";

const customizationSlice = createSlice({
  name: "customization_Slice",
  initialState: {
    customized: false,
  },

  reducers: {
    changeCustomizationState: (state, action) => {
      state.customized = action.payload.customized;
    },
  },
});

export const customizationSliceActions = customizationSlice.actions;
const customizationSliceReducers = customizationSlice.reducer;
export default customizationSliceReducers;
