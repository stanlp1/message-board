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
            Profile
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
            All Posts
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
            Subscribed Posts
          </div>
        </div>
        <div className={Styles["sidebar-logout"]}>
          <div onClick={handleLogout} className={`${Styles["sidebar-item"]}`}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
