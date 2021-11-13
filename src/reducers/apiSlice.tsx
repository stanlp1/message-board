import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type PostRType = PostType[];

export type PostType = {
  content: string;
  username: string;
  created_at: string;
  liked: boolean;
  post_id: number;
  image_url: string;
  like_count: number;
  comment_count: number;
  screen_name: string;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://safe-wave-92099.herokuapp.com/",
    credentials: "include",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostRType, void>({
      query: () => "posts/getAllPosts",
      providesTags: ["Post"],
    }),
    getSubPosts: builder.query<PostRType, void>({
      query: () => "posts/getSubscribedPosts",
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (postContent) => ({
        url: "posts/new",
        method: "POST",
        body: postContent,
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation<void, number>({
      query: (post_id) => ({
        url: "posts/likePost",
        method: "POST",
        body: { post_id },
      }),
      async onQueryStarted(post_id, { dispatch, queryFulfilled }) {
        try {
          //await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getAllPosts", undefined, (posts) => {
              console.log("patching");
              posts.forEach((post) => {
                if (post.post_id === post_id) {
                  post.like_count++;
                  post.liked = true;
                }
              });
            })
          );
          dispatch(
            apiSlice.util.updateQueryData("getSubPosts", undefined, (posts) => {
              console.log("patching");
              posts.forEach((post) => {
                if (post.post_id === post_id) {
                  post.like_count++;
                  post.liked = true;
                }
              });
            })
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
    unlikePost: builder.mutation<void, number>({
      query: (post_id) => ({
        url: "posts/unlikePost",
        method: "POST",
        body: { post_id },
      }),
      async onQueryStarted(post_id, { dispatch, queryFulfilled }) {
        try {
          //await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getAllPosts", undefined, (posts) => {
              console.log("patching");
              posts.forEach((post) => {
                if (post.post_id === post_id) {
                  post.like_count--;
                  post.liked = false;
                }
              });
            })
          );
          dispatch(
            apiSlice.util.updateQueryData("getSubPosts", undefined, (posts) => {
              console.log("patching");
              posts.forEach((post) => {
                if (post.post_id === post_id) {
                  post.like_count--;
                  post.liked = false;
                }
              });
            })
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetSubPostsQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} = apiSlice;
