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
      <h4 className={Styles["widget-title"]}>Suggested Users</h4>
      {isSuccess &&
        users.map((user: any, index: any) => (
          <SuggestedUser
            isLast={index === users.length - 1}
            key={user.username}
            user={user}
          ></SuggestedUser>
        ))}
    </div>
  );
};

export default Suggested;
