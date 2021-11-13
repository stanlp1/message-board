import { PostType, useGetSubPostsQuery } from "../../reducers/apiSlice";
import Styles from "./Feed.module.css";
import PostForm from "./PostForm";
import Post from "./Post";
import { CircularProgress } from "@mui/material";

const SubFeed = (): JSX.Element => {
  const { data: feed, isLoading, isSuccess } = useGetSubPostsQuery();

  let content;

  if (isLoading) content = <CircularProgress></CircularProgress>;
  else if (isSuccess)
    content = feed!.map((post: PostType, index: any) => (
      <Post post={post}></Post>
    ));
  return (
    <div className={Styles["feed-container"]}>
      <h3 className={Styles["feed-header"]}>Home</h3>
      <PostForm></PostForm>
      {content}
    </div>
  );
};

export default SubFeed;
