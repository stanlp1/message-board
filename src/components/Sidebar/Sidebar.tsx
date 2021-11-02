import React from "react";
import Styles from "./Sidebar.module.css";

const Sidebar = (): JSX.Element => {
  return (
    <div className={Styles["sidebar-container"]}>
      <div className={Styles["sidebar-item"]}>Home</div>
      <div className={Styles["sidebar-item"]}>Profile</div>
      <div className={Styles["sidebar-item"]}>Messages</div>
    </div>
  );
};

export default Sidebar;
