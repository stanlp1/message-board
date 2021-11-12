import Styles from "./Suggested.module.css";
import { useEffect, useState } from "react";
import { getSuggestedUsers } from "../../services/userServices";
import SuggestedUser from "./SuggestedUser";
const Suggested = (): JSX.Element => {
  const [users, setUsers] = useState<{ username: string }[]>([]);

  useEffect(() => {
    const popUsers = async () => {
      let userList = await getSuggestedUsers();
      // console.log(userList);
      setUsers(userList);
    };
    popUsers();
  }, []);
  return (
    <div className={Styles["widget-container"]}>
      <h5>Suggested Users</h5>
      {users.map((user, index) => (
        <SuggestedUser
          key={user.username}
          username={user.username}
        ></SuggestedUser>
      ))}
    </div>
  );
};

export default Suggested;
