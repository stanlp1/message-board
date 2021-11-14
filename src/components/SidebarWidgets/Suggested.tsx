import Styles from "./Suggested.module.css";
import SuggestedUser from "./SuggestedUser";
import { useGetSuggestedUsersQuery } from "../../reducers/apiSlice";
const Suggested = (): JSX.Element => {
  const { data: users, isSuccess } = useGetSuggestedUsersQuery();
  // useEffect(() => {
  //   const popUsers = async () => {
  //     let userList = await getSuggestedUsers();
  //     // console.log(userList);
  //     setUsers(userList);
  //   };
  //   popUsers();
  // }, []);
  return (
    <div className={Styles["widget-container"]}>
      <h5>Suggested Users</h5>
      {isSuccess &&
        users.map((user: any, index: any) => (
          <SuggestedUser
            key={user.username}
            username={user.username}
          ></SuggestedUser>
        ))}
    </div>
  );
};

export default Suggested;
