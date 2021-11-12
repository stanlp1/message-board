import Suggested from "../SidebarWidgets/Suggested";
import Styles from "./SidebarRight.module.css";

const SidebarRight = (): JSX.Element => {
  return (
    <div className={Styles["sidebar-container"]}>
      <Suggested />
    </div>
  );
};

export default SidebarRight;
