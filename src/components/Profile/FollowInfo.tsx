import Styles from "./Profile.module.css";
import { Avatar, CircularProgress } from "@mui/material";
import {
  FUser,
  useGetFollowerQuery,
  useGetFollowingQuery,
} from "../../reducers/apiSlice";
import Post from "../Feed/Post";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import SuggestedUser from "../SidebarWidgets/SuggestedUser";

let FollowInfo = (): JSX.Element => {
  let history = useHistory();
  let { username } = useParams<{ username: string }>();

  const {
    data: follower,
    isLoading: isLoading1,
    isSuccess: isSuccess1,
    isFetching: isFetching1,
  } = useGetFollowerQuery(username);

  const {
    data: following,
    isLoading: isLoading2,
    isSuccess: isSuccess2,
    isFetching: isFetching2,
  } = useGetFollowingQuery(username);

  let handleFollowingClick = () => {
    history.push(`/profile/${username}/following`);
  };

  let handleFollowerClick = () => {
    history.push(`/profile/${username}/followers`);
  };

  let content;

  let isFollowing = history.location.pathname.slice(-9).includes("following");
  let isFollower = history.location.pathname.slice(-9).includes("followers");

  if (isFollowing) {
    if (isLoading2 || isFetching2) {
      content = <CircularProgress className={Styles["loading-indicator"]} />;
    } else if (isSuccess2) {
      content = following!.map((user: FUser, index: any) => (
        <SuggestedUser isLast={false} key={user.username} user={user} />
      ));
    }
  } else if (isFollower) {
    if (isLoading1 || isFetching1) {
      content = <CircularProgress className={Styles["loading-indicator"]} />;
    } else if (isSuccess1) {
      content = follower!.map((user: FUser, index: any) => (
        <SuggestedUser isLast={false} key={user.username} user={user} />
      ));
    }
  }

  return (
    <div className={Styles["profile-container"]}>
      <div className={Styles["profile-header-container"]}>
        <ArrowBackIcon
          onClick={() => history.goBack()}
          className={Styles["back-arrow-icon"]}
        />
      </div>
      <div className={Styles["follower-page-button-container"]}>
        <div
          onClick={handleFollowerClick}
          className={Styles["follower-page-button-inner"]}
        >
          <div className={Styles["follower-page-button"]}>
            {isFollower ? (
              <>
                <b>Followers</b>
                <div className={Styles["follower-button-highlight"]}></div>
              </>
            ) : (
              "Followers"
            )}
          </div>
        </div>
        <div
          onClick={handleFollowingClick}
          className={Styles["follower-page-button-inner"]}
        >
          <div className={Styles["follower-page-button"]}>
            {isFollowing ? (
              <>
                <b>Following</b>
                <div className={Styles["follower-button-highlight"]}></div>
              </>
            ) : (
              "Following"
            )}
          </div>
        </div>
      </div>
      {content}
    </div>
  );
};

export default FollowInfo;
