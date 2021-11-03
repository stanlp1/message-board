import Styles from "./Header.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logout } from "../../reducers/authSlice";
import { userLogout } from "../../services/accountServices";

const UserControl = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await userLogout();
    dispatch(logout());
  };

  return (
    <div className={Styles["header-login-container"]}>
      {user}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserControl;
