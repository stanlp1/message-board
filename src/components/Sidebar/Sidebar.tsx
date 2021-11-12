import React from "react";
import Styles from "./Sidebar.module.css";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import {
  updateAllPosts,
  updateSubscribedPosts,
} from "../../reducers/feedSlice";
import { userLogout } from "../../services/accountServices";
import { logout } from "../../reducers/authSlice";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const Sidebar = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const handleNavClick = async (e: any) => {
    let option = e.target.id;
    if (option === "/all") {
      dispatch(updateAllPosts());
    } else if (option === "/subscribed") {
      dispatch(updateSubscribedPosts());
    }
    history.push(option);
  };

  const handleLogout = async (e: any) => {
    await userLogout();
    dispatch(logout());
  };

  return (
    <div className={Styles["sidebar-container"]}>
      <div className={Styles["sidebar-logo"]}>
        <TextSnippetIcon style={{ fontSize: "40px" }} />
      </div>

      {/* <div
        onClick={handleNavClick}
        id="/profile"
        className={Styles["sidebar-item"]}
      >
        Profile
      </div> */}
      <div
        onClick={handleNavClick}
        id="/all"
        className={Styles["sidebar-item"]}
      >
        All Posts
      </div>
      <div
        onClick={handleNavClick}
        id="/subscribed"
        className={Styles["sidebar-item"]}
      >
        Subscribed Posts
      </div>
      <div
        onClick={handleLogout}
        className={`${Styles["sidebar-item"]} ${Styles["sidebar-logout"]}`}
      >
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
