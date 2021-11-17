import { PostType, useGetAllPostsQuery } from "../../reducers/apiSlice";
import Styles from "./Feed.module.css";
import PostForm from "./PostForm";
import Post from "./Post";
import { CircularProgress } from "@mui/material";

const Feed = (): JSX.Element => {
  //const feed = useAppSelector((state) => state.feed);
  // const dispatch = useAppDispatch();
  // const user = useAppSelector((state) => state.auth.user);
  const { data: feed, isLoading, isSuccess } = useGetAllPostsQuery();

  let content;
  // useEffect(() => {
  //   if (user !== "") {
  //     if (type === "all") {
  //       dispatch(updateAllPosts());
  //     } else if (type === "subscribed") {
  //       dispatch(updateSubscribedPosts());
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user, dispatch]);
  if (isLoading)
    content = (
      <CircularProgress
        className={Styles["loading-indicator"]}
      ></CircularProgress>
    );
  else if (isSuccess)
    content = feed!.map((post: PostType, index: any) => (
      <Post key={post.post_id} post={post}></Post>
    ));
  return (
    <div className={Styles["feed-container"]}>
      <h3 className={Styles["feed-header"]}>All</h3>
      <PostForm></PostForm>
      {content}
    </div>
  );
};

export default Feed;
