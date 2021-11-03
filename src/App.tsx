import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import { useAppSelector } from "./app/hooks";
import { Redirect, Route, Switch } from "react-router";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import LoginPage from "./components/LoginPage/LoginPage";

const App = (): JSX.Element => {
  // if (!loggedIn) {
  //   return (
  //     <div>
  //       <LoginPage></LoginPage>
  //     </div>
  //   );
  // }
  // return (
  //   <div>
  //     <Header></Header>
  //     <Sidebar></Sidebar>
  //     <Feed></Feed>
  //   </div>
  // );
  return (
    <Switch>
      <Route path="/login">
        <LoginPage></LoginPage>
      </Route>
      <AuthRoute path="/feed">
        <Header></Header>
        <Sidebar></Sidebar>
        <Feed></Feed>
      </AuthRoute>
      <AuthRoute path="/">
        <Redirect to="/feed"></Redirect>
      </AuthRoute>
    </Switch>
  );
};

export default App;
