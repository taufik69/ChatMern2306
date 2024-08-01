import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : {},

  NotificationCount: 0,
};

export const FriendSlice = createSlice({
  name: "FriendSlice",
  initialState: initialState,
  reducers: {
    friendsAction: (state, action) => {
      state.Users = action.payload;
      localStorage.setItem("users", JSON.stringify(state.Users));
    },
    NotificationCounter: (state, action) => {
      state.NotificationCount = action.payload;
      // localStorage.setItem("notificati", JSON.stringify(state.Users));
    },
  },
});

// Action creators are generated for each case reducer function
export const { friendsAction, NotificationCounter } = FriendSlice.actions;
export default FriendSlice.reducer;
