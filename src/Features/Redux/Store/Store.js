import { configureStore } from "@reduxjs/toolkit";
import Friends from "../FreindSlice/FriendSlice.js";
export const store = configureStore({
  reducer: {
    Friends: Friends,
  },
});
