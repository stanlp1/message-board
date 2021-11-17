import Styles from "./Profile.module.css";
import { Avatar, CircularProgress } from "@mui/material";
import {
  PostType,
  useGetUserPostsQuery,
  useGetUserQuery,
} from "../../reducers/apiSlice";
import Post from "../Feed/Post";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
let Profile = (): JSX.Element => {
  let history = useHistory();
  let { username } = useParams<{ username: string }>();
  const { data: user } = useGetUserQuery(username);
  const {
    data: posts,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetUserPostsQuery(username);

  let content;

  if (isLoading || isFetching) {
    content = <CircularProgress className={Styles["loading-indicator"]} />;
  } else if (isSuccess)
    content = posts!.map((post: PostType, index: any) => (
      <Post key={post.post_id} post={post}></Post>
    ));

  let handleFollowingClick = () => {
    history.push(`/profile/${username}/following`);
  };
  let handleFollowerClick = () => {
    history.push(`/profile/${username}/followers`);
  };
  return (
    <div className={Styles["profile-container"]}>
      <div className={Styles["profile-header-container"]}>
        <ArrowBackIcon
          onClick={() => history.goBack()}
          className={Styles["back-arrow-icon"]}
        />
      </div>
      <div className={Styles["profile-image-container"]}></div>
      <div className={Styles["name-section"]}>
        <Avatar className={Styles["profile-avatar"]} />
        <h2>{user?.screen_name}</h2>
        <div>@{user?.username}</div>
        <div className={Styles["follow-section"]}>
          <span
            onClick={handleFollowingClick}
            className={Styles["follow-label-container"]}
          >
            {user?.following_count}{" "}
            <span className={Styles["follow-label"]}>Following</span>
          </span>
          <span
            onClick={handleFollowerClick}
            className={Styles["follow-label-container"]}
          >
            {user?.follower_count}{" "}
            <span className={Styles["follow-label"]}>Follower</span>
          </span>
        </div>
      </div>
      {content}
    </div>
  );
};

export default Profile;
