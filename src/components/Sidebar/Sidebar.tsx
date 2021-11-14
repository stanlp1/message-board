import React from "react";
import Styles from "./Sidebar.module.css";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userLogout } from "../../services/accountServices";
import { logout } from "../../reducers/authSlice";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { apiSlice } from "../../reducers/apiSlice";

const Sidebar = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const handleNavClick = async (e: any) => {
    let option = e.target.id;
    // if (option === "/all") {
    //   dispatch(updateAllPosts());
    // } else if (option === "/subscribed") {
    //   dispatch(updateSubscribedPosts());
    // }
    // dispatch(
    //   api.endpoints.getPosts.initiate(
    //     { count: 5 },
    //     { subscribe: false, forceRefetch: true }

    if (option === "/all") {
      console.log("dispatching refetch");
      dispatch(
        apiSlice.endpoints.getAllPosts.initiate(undefined, {
          subscribe: false,
          forceRefetch: true,
        })
      );
    } else if (option === "/subscribed") {
      console.log("sub posts");
      dispatch(
        apiSlice.endpoints.getSubPosts.initiate(undefined, {
          subscribe: false,
          forceRefetch: true,
        })
      );
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

      <div
        onClick={handleNavClick}
        id={`/profile/${user}`}
        className={Styles["sidebar-item"]}
      >
        Profile
      </div>
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
