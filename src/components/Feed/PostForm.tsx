import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setPosts } from "../../reducers/feedSlice";
import { getAllUserPosts, makeNewPost } from "../../services/postServices";
import Styles from "./PostForm.module.css";

const PostForm = (): JSX.Element => {
  const [post, setPost] = useState("");
  const dispatch = useAppDispatch();
  const handleNewPost = async () => {
    let res = await makeNewPost(post);
    let posts = await getAllUserPosts();
    dispatch(setPosts({ posts }));
    console.log(res);
  };
  return (
    <div className={Styles["post-form-container"]}>
      <textarea
        className={Styles["post-text-area"]}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>
      <button className={Styles["post-form-button"]} onClick={handleNewPost}>
        Submit Post
      </button>
    </div>
  );
};

export default PostForm;
