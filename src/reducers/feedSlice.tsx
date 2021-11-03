import { createSlice } from "@reduxjs/toolkit";

type feedSliceState = { content: String; username: String; created_at: Date }[];
const initialState: feedSliceState = [];

let feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addPostToTop: (state, action) => {
      return [action.payload, ...state];
    },
    setPosts: (state, action) => {
      return action.payload.posts;
    },
  },
});

export const { addPostToTop, setPosts } = feedSlice.actions;
export default feedSlice.reducer;
