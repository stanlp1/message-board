import { login } from "../../reducers/authSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userLogin, userRegister } from "../../services/accountServices";
import { useHistory } from "react-router";
import { Redirect } from "react-router";
import Styles from "../LoginPage/LoginPage.module.css";

const Register = (): JSX.Element => {
  const [screen_name, setScreenname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let loggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  let history = useHistory();
  const dispatch = useAppDispatch();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const registerResult = await userRegister(username, password, screen_name);
    if (registerResult.status === 202) {
      const loginResult = await userLogin(username, password);
      if (loginResult.status === 202) {
        dispatch(login({ user: username }));
        history.push("/all");
      }
    }
  };

  if (loggedIn) return <Redirect to="/all"></Redirect>;

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
      ></input>
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
      <button className={Styles["login-form-input"]} onClick={handleRegister}>
        Sign Up
      </button>
      <button
        className={Styles["login-form-input"]}
        onClick={() => history.push("/login")}
      >
        Back to Login Page
      </button>
    </form>
  );
};

export default Register;
