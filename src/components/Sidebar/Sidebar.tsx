import Styles from "./Sidebar.module.css";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userLogout } from "../../services/accountServices";
import { logout } from "../../reducers/authSlice";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { apiSlice } from "../../reducers/apiSlice";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const handleNavClick = async (e: any) => {
    let option = e.currentTarget.id;
    console.log("nav clicked", option);
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
    <div className={Styles["sidebar-outer-container"]}>
      <div className={Styles["sidebar-container"]}>
        <div
          onClick={handleNavClick}
          id="/all"
          className={Styles["sidebar-logo-container"]}
        >
          <TextSnippetIcon className={Styles["sidebar-logo"]} />
        </div>
        <div>
          <div
            onClick={handleNavClick}
            id={`/profile/${user}`}
            className={Styles["sidebar-item"]}
          >
            {history.location.pathname.includes("profile") ? (
              <PersonIcon className={Styles["sidebar-logo"]} />
            ) : (
              <PersonOutlinedIcon className={Styles["sidebar-logo"]} />
            )}
            <span className={Styles["sidebar-item-text"]}>Profile</span>
          </div>
        </div>
        <div>
          <div
            onClick={handleNavClick}
            id="/all"
            className={Styles["sidebar-item"]}
          >
            {history.location.pathname.includes("all") ? (
              <HomeIcon className={Styles["sidebar-logo"]} />
            ) : (
              <HomeOutlinedIcon className={Styles["sidebar-logo"]} />
            )}
            <span className={Styles["sidebar-item-text"]}>All Posts</span>
          </div>
        </div>
        <div>
          <div
            onClick={handleNavClick}
            id="/subscribed"
            className={Styles["sidebar-item"]}
          >
            {history.location.pathname.includes("subscribed") ? (
              <ViewColumnIcon className={Styles["sidebar-logo"]} />
            ) : (
              <ViewColumnOutlinedIcon className={Styles["sidebar-logo"]} />
            )}
            <span className={Styles["sidebar-item-text"]}>
              Subscribed Posts
            </span>
          </div>
        </div>
        <div>
          <a
            href="https://github.com/stanlp1/message-board/"
            className={Styles["sidebar-hyperlink"]}
          >
            <GitHubIcon className={Styles["sidebar-logo"]} />
            <span className={Styles["sidebar-item-text"]}>Github src</span>
          </a>
        </div>
        <div className={Styles["sidebar-logout"]}>
          <div onClick={handleLogout} className={`${Styles["sidebar-item"]}`}>
            <LogoutIcon className={Styles["sidebar-logo"]} />
            <span className={Styles["sidebar-item-text"]}>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
