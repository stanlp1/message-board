import { login } from "../../reducers/authSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Styles from "../LoginPage/LoginPage.module.css";
import LoadingButton from "../common/LoadingButton";
import { Button } from "@mui/material";
import { useLoginMutation, useRegisterMutation } from "../../reducers/apiSlice";
const Register = (): JSX.Element => {
  const [screen_name, setScreenname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let [register, { isLoading, isSuccess }] = useRegisterMutation();
  let [loginUser, { isLoading: loginLoading, isSuccess: loginSuccess }] =
    useLoginMutation();
  let loggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  let history = useHistory();
  const dispatch = useAppDispatch();

  if (loggedIn) history.push("/all");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    register({ user: username, pass: password, screen_name });
    // const registerResult = await userRegister(username, password, screen_name);
    // if (registerResult.status === 202) {
    //   const loginResult = await userLogin(username, password);
    //   if (loginResult.status === 202) {
    //     dispatch(login({ user: username }));
    //     history.push("/all");
    //   }
    // }
  };

  useEffect(() => {
    if (isSuccess) {
      loginUser({ user: username, pass: password });
    }
  }, [isSuccess, loginUser, password, username]);

  if (loginSuccess) {
    dispatch(login({ user: username }));
    history.push("/feed");
  }

  return (
    <form className={Styles["login-form-container"]}>
      <label>
        <b>Screen Name</b>
      </label>
      <input
        className={Styles["login-form-input"]}
        onChange={(e) => setScreenname(e.target.value)}
        placeholder="Screen Name"
        type="text"
        required
      ></input>
      <label>
        <b>Username</b>
      </label>
      <input
        className={Styles["login-form-input"]}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
        required
      ></input>
      <label>
        <b>Password</b>
      </label>
      <input
        className={Styles["login-form-input"]}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        required
      ></input>
      <div className={Styles["login-button-container"]}>
        <LoadingButton
          type="submit"
          variant="outlined"
          className={Styles["login-form-input"]}
          onClick={handleRegister}
          isLoading={isLoading || loginLoading}
          content="Sign Up"
          disabled={username === "" || password === "" || screen_name === ""}
        ></LoadingButton>
        <Button
          variant="outlined"
          className={Styles["login-form-input"]}
          onClick={() => history.push("/login")}
        >
          Back to Login Page
        </Button>
      </div>
    </form>
  );
};

export default Register;
