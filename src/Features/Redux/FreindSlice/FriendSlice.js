import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : {},
};

export const FriendSlice = createSlice({
  name: "FriendSlice",
  initialState: initialState,
  reducers: {
    friendsAction: (state, action) => {
      state.Users = action.payload;
      localStorage.setItem("users", JSON.stringify(state.Users));
    },
  },
});

// Action creators are generated for each case reducer function
export const { friendsAction } = FriendSlice.actions;
export default FriendSlice.reducer;
