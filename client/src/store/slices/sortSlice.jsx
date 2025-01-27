import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort_Slice",
  initialState: {
    sortBasis: null,
  },

  reducers: {
    populateSortBasis: (state, action) => {
      state.sortBasis = action.payload.sortBasis;
    },
  },
});

export const sortSliceActions = sortSlice.actions;

const sortSliceReducers = sortSlice.reducer;
export default sortSliceReducers;
