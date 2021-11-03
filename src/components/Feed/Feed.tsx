import React from "react";
import { useEffect } from "react";
import { getAllUserPosts } from "../../services/postServices";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPosts } from "../../reducers/feedSlice";
import PostForm from "./PostForm";

const Feed = (): JSX.Element => {
  const feed = useAppSelector((state) => state.feed);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user !== "") {
      getAllUserPosts().then((posts) => {
        dispatch(setPosts({ posts }));
        console.log(posts);
      });
    }
  }, [user, dispatch]);

  if (feed.length !== 0) {
    return (
      <div>
        <PostForm></PostForm>
        <div>
          {feed.map((post, index) => (
            <div key={index}>{post.content}</div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      No Posts
      <PostForm></PostForm>
    </div>
  );
};

export default Feed;
