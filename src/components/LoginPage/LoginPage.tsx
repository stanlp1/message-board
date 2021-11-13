import { login } from "../../reducers/authSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userLogin, userRegister } from "../../services/accountServices";
import { useHistory } from "react-router";
import { Redirect } from "react-router";
import Styles from "./LoginPage.module.css";

const LoginPage = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let loggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  let history = useHistory();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const loginResult = await userLogin(username, password);
    if (loginResult.status === 202) {
      dispatch(login({ user: username }));
      history.push("/feed");
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    history.push("/register");
  };

  if (loggedIn) return <Redirect to="/all"></Redirect>;

  return (
    <form className={Styles["login-form-container"]}>
      <label>
        <b>Username</b>
      </label>
      <input
        className={Styles["login-form-input"]}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
      ></input>
      <label>
        <b>Password</b>
      </label>
      <input
        className={Styles["login-form-input"]}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      ></input>
      <button
        className={`${Styles["login-form-input"]} ${Styles["login-form-button"]}`}
        onClick={handleLogin}
      >
        Submit
      </button>
      <button className={Styles["login-form-input"]} onClick={handleRegister}>
        Sign Up
      </button>
    </form>
  );
};

export default LoginPage;