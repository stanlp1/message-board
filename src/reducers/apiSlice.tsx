import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export type User = {
  username: string;
  screen_name: string;
  follower_count: number;
  following_count: number;
  bio: string;
};

export type FUser = {
  username: string;
  screen_name: string;
  followed: boolean;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://safe-wave-92099.herokuapp.com/",
    credentials: "include",
  }),
  tagTypes: ["Post", "Comment"],
  endpoints: (builder) => ({
    getComments: builder.query<any, string | number>({
      query: (post_id) => `posts/${post_id}/comments`,
      providesTags: (result, error, arg) => [{ type: "Comment", id: arg }],
    }),
    getFollower: builder.query<FUser[], string>({
      query: (username) => `user/${username}/follower`,
    }),
    getFollowing: builder.query<FUser[], string>({
      query: (username) => `user/${username}/following`,
    }),
    getUser: builder.query<User, string>({
      query: (username) => `user/${username}`,
    }),
    getUserPosts: builder.query<PostType[], string>({
      query: (username) => `user/${username}/posts`,
    }),
    getAllPosts: builder.query<PostType[], void>({
      query: () => "posts/getAllPosts",
      providesTags: ["Post"],
    }),
    getSuggestedUsers: builder.query<any, void>({
      query: () => "user/suggestedUsers",
    }),
    getSubPosts: builder.query<PostType[], void>({
      query: () => "posts/getSubscribedPosts",
      providesTags: ["Post"],
    }),
    createComment: builder.mutation({
      query: (body) => ({
        url: "/posts/createComment",
        method: "POST",
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.post_id },
      ],
    }),
    follow: builder.mutation({
      query: (body) => ({
        url: "user/followUser",
        method: "POST",
        body: body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "account/login",
        method: "POST",
        body: body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "account/register",
        method: "POST",
        body: body,
      }),
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
  useGetUserQuery,
  useGetUserPostsQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetSuggestedUsersQuery,
  useFollowMutation,
  useGetFollowerQuery,
  useGetFollowingQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
} = apiSlice;
