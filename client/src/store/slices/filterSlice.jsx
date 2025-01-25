import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter_Slice",
  initialState: {
    activeFilterId: null, // cid
    filteredCategory: null,
    filteredPriceRangeMinimum: null,
    filteredPriceRangeMaximum: null,
    filteredProductSlug: null,
  },

  reducers: {
    populateActiveFilterId: (state, action) => {
      state.activeFilterId = action.payload.activeFilterId;
    },
    populateFilteredCategory: (state, action) => {
      state.filteredCategory = action.payload.filteredCategory;
    },
    populateFilteredPriceRangeMinimum: (state, action) => {
      state.filteredPriceRangeMinimum =
        action.payload.filteredPriceRangeMinimum;
    },
    populateFilteredPriceRangeMaximum: (state, action) => {
      state.filteredPriceRangeMaximum =
        action.payload.filteredPriceRangeMaximum;
    },
    populateFilteredProductSlug: (state, action) => {
      state.filteredProductSlug = action.payload.filteredProductSlug;
    },
  },
});

export const filterSliceActions = filterSlice.actions;

const filterSliceReducers = filterSlice.reducer;
export default filterSliceReducers;
