import React from "react";
import Styles from "./Header.module.css";
import UserControl from "./UserControl";
const Header = (): JSX.Element => {
  return (
    <div className={Styles["header-container"]}>
      <div className={Styles["header-title"]}>Twitter</div>
      <UserControl></UserControl>
    </div>
  );
};

export default Header;
