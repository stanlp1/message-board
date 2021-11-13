import Styles from "./Profile.module.css";
import { Avatar } from "@mui/material";
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
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(username);

  let content;
  const {
    data: posts,
    isLoading: isLoading2,
    isSuccess: isSucc2,
    isError: isError2,
    error: error2,
  } = useGetUserPostsQuery(username);
  console.log(user);
  if (isSucc2)
    content = posts!.map((post: PostType, index: any) => (
      <Post post={post}></Post>
    ));
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
      </div>
      {content}
    </div>
  );
};

export default Profile;
