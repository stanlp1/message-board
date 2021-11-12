import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPosts,
  getAllSubscribedPosts,
  likePost,
  unlikePost,
} from "../services/postServices";

type feedSliceState = {
  content: string;
  username: string;
  created_at: string;
  liked: boolean;
  post_id: number;
  image_url: string;
  like_count: number;
  comment_count: number;
}[];
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
    clearFeed: (state) => {
      return [];
    },
    feedLikePost: (state, action) => {
      return state.map((post) =>
        post.post_id === action.payload.post_id
          ? { ...post, liked: true, like_count: post.like_count + 1 }
          : post
      );
    },
    feedUnlikePost: (state, action) => {
      return state.map((post) =>
        post.post_id === action.payload.post_id
          ? { ...post, liked: false, like_count: post.like_count - 1 }
          : post
      );
    },
  },
});

export const updateAllPosts = () => {
  return (dispatch: any, getState: any) => {
    getAllPosts().then((posts) => {
      dispatch(setPosts({ posts }));
      // console.log(posts);
    });
  };
};

export const updateSubscribedPosts = () => {
  return (dispatch: any, getState: any) => {
    getAllSubscribedPosts().then((posts) => {
      dispatch(setPosts({ posts }));
      // console.log(posts);
    });
  };
};

export const updateLikePost = (post_id: number) => {
  return (dispatch: any, getState: any) => {
    likePost(post_id);
    dispatch(feedLikePost({ post_id }));
  };
};

export const updateUnlikePost = (post_id: number) => {
  return (dispatch: any, getState: any) => {
    unlikePost(post_id);
    dispatch(feedUnlikePost({ post_id }));
  };
};
export const {
  addPostToTop,
  setPosts,
  clearFeed,
  feedLikePost,
  feedUnlikePost,
} = feedSlice.actions;
export default feedSlice.reducer;
