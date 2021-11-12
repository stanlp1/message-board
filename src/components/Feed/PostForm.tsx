import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  updateAllPosts,
  updateSubscribedPosts,
} from "../../reducers/feedSlice";
import { makeNewPost } from "../../services/postServices";
import Styles from "./PostForm.module.css";
import { Button } from "@mui/material";

const PostForm = ({ type }: { type: String }): JSX.Element => {
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useAppDispatch();
  const handleNewPost = async () => {
    await makeNewPost(post, image);
    if (type === "all") dispatch(updateAllPosts());
    else if (type === "subscribed") dispatch(updateSubscribedPosts());
  };
  return (
    <div className={Styles["post-form-container"]}>
      <textarea
        className={Styles["post-text-area"]}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>
      <div className={Styles["post-submit-container"]}>
        <input
          onChange={(e) => setImage(e.target.value)}
          className={Styles["post-image-input"]}
          type="text"
          placeholder="Image URL(optional)"
        ></input>
        <Button
          className={Styles["post-form-button"]}
          onClick={handleNewPost}
          variant="contained"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default PostForm;
