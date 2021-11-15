import { login } from "../../reducers/authSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import LoadingButton from "../common/LoadingButton";
import { useHistory } from "react-router";
import Styles from "./LoginPage.module.css";
import { Button } from "@mui/material";
import { useLoginMutation } from "../../reducers/apiSlice";

const LoginPage = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let [loginUser, { isSuccess, isLoading }] = useLoginMutation();
  let loggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  let history = useHistory();
  const dispatch = useAppDispatch();

  if (loggedIn) {
    history.push("/all");
  }
  const handleLogin = async (e: any) => {
    e.preventDefault();
    loginUser({ user: username, pass: password });
    // const loginResult = await userLogin(username, password);
    // if (loginResult.status === 202) {
    //   dispatch(login({ user: username }));
    //   history.push("/feed");
    // }
  };

  const handleTestLogin = async (e: any) => {
    e.preventDefault();
    setUsername("test");
    loginUser({ user: "test", pass: "test" });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    history.push("/register");
  };

  if (isSuccess) {
    dispatch(login({ user: username }));
    history.push("/feed");
  }

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
      <div className={Styles["login-button-container"]}>
        <LoadingButton
          variant="outlined"
          className={`${Styles["login-form-button"]}`}
          onClick={handleLogin}
          content="Log In"
          isLoading={isLoading}
        ></LoadingButton>
        <Button
          variant="outlined"
          className={Styles["login-form-button"]}
          onClick={handleRegister}
        >
          Sign Up
        </Button>
      </div>

      <LoadingButton
        variant="outlined"
        className={`${Styles["login-form-button"]}`}
        onClick={handleTestLogin}
        content="Log Into Test Account"
        isLoading={isLoading}
      ></LoadingButton>
    </form>
  );
};

export default LoginPage;
