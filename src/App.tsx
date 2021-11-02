import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import { useAppSelector } from "./app/hooks";
import LoginPage from "./components/LoginPage/LoginPage";

const App = (): JSX.Element => {
  const loggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (!loggedIn) {
    return (
      <div>
        <LoginPage></LoginPage>
      </div>
    );
  }
  return (
    <div>
      <Header></Header>
      <Sidebar></Sidebar>
      <Feed></Feed>
    </div>
  );
};

export default App;
