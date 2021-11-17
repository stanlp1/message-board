import { useHistory } from "react-router";
import Styles from "./Suggested.module.css";
import { Avatar } from "@mui/material";
import PostStyles from "../Feed/Post.module.css";
import { stringAvatar } from "../Feed/PostForm";
import LoadingButton from "../common/LoadingButton";
import { useFollowMutation } from "../../reducers/apiSlice";

const SuggestedUser = ({
  user,
  isLast,
}: {
  user: any;
  isLast: any;
}): JSX.Element => {
  let [follow, { isLoading, isSuccess }] = useFollowMutation();
  const history = useHistory();
  const handleFollow = () => {
    follow({ target: user.username });
  };

  const handleRedirectProfile = async () => {
    history.push(`/profile/${user.username}`);
  };
  return (
    <div
      className={`${Styles["suggested-entry"]} ${
        isLast && Styles["last-element"]
      }`}
    >
      <div
        onClick={handleRedirectProfile}
        className={Styles["inner-container"]}
      >
        <Avatar
          className={Styles["suggested-avatar"]}
          {...stringAvatar(user.username)}
        />
        <div>
          <div className={PostStyles.screenname}>{user.screen_name}</div>@
          {user.username}
        </div>
      </div>
      <LoadingButton
        disabledClass={Styles["disabled-button"]}
        disabled={isSuccess || user.followed === true}
        className={Styles["follow-button"]}
        onClick={handleFollow}
        isLoading={isLoading}
        variant="contained"
        content="Follow"
        disabledText="Followed"
      />
    </div>
  );
};

export default SuggestedUser;
