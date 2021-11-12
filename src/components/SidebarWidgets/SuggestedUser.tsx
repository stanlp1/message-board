import { followUser } from "../../services/userServices";
import Styles from "./Suggested.module.css";

const SuggestedUser = ({ username }: { username: string }): JSX.Element => {
  const handleFollow = () => {
    followUser(username);
  };
  return (
    <div className={Styles["suggested-entry"]}>
      {username}
      <button onClick={handleFollow}>Follow</button>
    </div>
  );
};

export default SuggestedUser;
