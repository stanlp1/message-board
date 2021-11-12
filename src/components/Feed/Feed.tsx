import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  updateAllPosts,
  updateSubscribedPosts,
} from "../../reducers/feedSlice";
import Styles from "./Feed.module.css";
import PostForm from "./PostForm";
import Post from "./Post";

const Feed = ({ type }: { type: String }): JSX.Element => {
  const feed = useAppSelector((state) => state.feed);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user !== "") {
      if (type === "all") {
        dispatch(updateAllPosts());
      } else if (type === "subscribed") {
        dispatch(updateSubscribedPosts());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);

  return (
    <div className={Styles["feed-container"]}>
      <h3 className={Styles["feed-header"]}>Home</h3>
      <PostForm type={type}></PostForm>
      {feed.length !== 0 ? (
        <div>
          {" "}
          {feed.map((post, index) => (
            <Post
              post_id={post.post_id}
              key={index}
              content={post.content}
              username={post.username}
              created_at={post.created_at}
              liked={post.liked}
              image_url={post.image_url}
              like_count={post.like_count}
              comment_count={post.comment_count}
            ></Post>
          ))}{" "}
        </div>
      ) : (
        "No Posts"
      )}
    </div>
  );
};

export default Feed;
