import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user_Slice",
  initialState: {
    uid: "",
  },
  reducers: {
    populateUserSlice: (state, action) => {
      state.uid = action.payload.uid;
    },
  },
});

export const userSliceActions = userSlice.actions;

const userSliceReducers = userSlice.reducer;
export default userSliceReducers;
