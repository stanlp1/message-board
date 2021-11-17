import Styles from "./Profile.module.css";
import { Avatar, CircularProgress } from "@mui/material";
import { FUser, useGetFollowerQuery } from "../../reducers/apiSlice";
import Post from "../Feed/Post";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import SuggestedUser from "../SidebarWidgets/SuggestedUser";

let FollowerPage = (): JSX.Element => {
  let history = useHistory();
  let { username } = useParams<{ username: string }>();
  const {
    data: users,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetFollowerQuery(username);

  let content;
  if (isSuccess)
    content = users!.map((user: FUser, index: any) => (
      <SuggestedUser isLast={false} key={user.username} user={user} />
    ));
  else if (isLoading || isFetching) {
    content = <CircularProgress className={Styles["loading-indicator"]} />;
  }
  let handleFollowingClick = () => {
    history.push(`/profile/${username}/following`);
  };
  return (
    <div className={Styles["profile-container"]}>
      <div className={Styles["profile-header-container"]}>
        <ArrowBackIcon
          onClick={() => history.goBack()}
          className={Styles["back-arrow-icon"]}
        />
      </div>
      <div className={Styles["follower-page-button-container"]}>
        <div className={Styles["follower-page-button-inner"]}>
          <div className={Styles["follower-page-button"]}>
            <b>Followers</b>
            <div className={Styles["follower-button-highlight"]}></div>
          </div>
        </div>
        <div
          onClick={handleFollowingClick}
          className={Styles["follower-page-button-inner"]}
        >
          <div className={Styles["follower-page-button"]}>Following</div>
        </div>
      </div>
      {content}
    </div>
  );
};

export default FollowerPage;
