import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user_Slice",
  initialState: {
    uid: null,
    role: null,
    isVerified: null,
    isActive: null,
    username: null,
  },
  reducers: {
    populateUserSlice: (state, action) => {
      state.uid = action.payload.uid;
      state.role = action.payload.role;
      state.isVerified = action.payload.isVerified;
      state.isActive = action.payload.isActive;
      state.username = action.payload.username;
    },
  },
});

export const userSliceActions = userSlice.actions;

const userSliceReducers = userSlice.reducer;
export default userSliceReducers;
