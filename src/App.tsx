import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import { Redirect, Route, Switch } from "react-router";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import LoginPage from "./components/LoginPage/LoginPage";
import Styles from "./app.module.css";
import SidebarRight from "./components/SidebarRight/SidebarRight";
import FollowInfo from "./components/Profile/FollowInfo";
import SubFeed from "./components/Feed/SubFeed";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";

const App = (): JSX.Element => {
  return (
    <div className={Styles["app-container"]}>
      <Switch>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/register">
          <Register></Register>
        </Route>
        <AuthRoute path="/all">
          <Sidebar />
          <Feed></Feed>
          <SidebarRight />
        </AuthRoute>
        <AuthRoute path="/subscribed">
          <Sidebar />
          <SubFeed></SubFeed>
          <SidebarRight />
        </AuthRoute>
        <AuthRoute path="/profile/:username/followers">
          <Sidebar />
          <FollowInfo />
          <SidebarRight />
        </AuthRoute>
        <AuthRoute path="/profile/:username/following">
          <Sidebar />
          <FollowInfo />
          <SidebarRight />
        </AuthRoute>
        <AuthRoute path="/profile/:username">
          <Sidebar />
          <Profile />
          <SidebarRight />
        </AuthRoute>

        <AuthRoute path="/">
          <Redirect to="/all"></Redirect>
        </AuthRoute>
      </Switch>
    </div>
  );
};

export default App;
