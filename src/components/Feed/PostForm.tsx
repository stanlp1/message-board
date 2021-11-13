import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Styles from "./PostForm.module.css";
import { Button } from "@mui/material";
import { useCreatePostMutation } from "../../reducers/apiSlice";
import { Avatar } from "@mui/material";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name[0].toUpperCase() + name[1],
  };
}

const PostForm = (): JSX.Element => {
  const [post, setPost] = useState("");
  let username = useAppSelector((state) => state.auth.user);
  const [image, setImage] = useState("");
  const [createPost, { isLoading }] = useCreatePostMutation();
  const dispatch = useAppDispatch();
  const handleNewPost = async () => {
    await createPost({ content: post, image }).unwrap();
    //await makeNewPost(post, image);
    // if (type === "all") dispatch(updateAllPosts());
    // else if (type === "subscribed") dispatch(updateSubscribedPosts());
  };
  return (
    <div className={Styles["post-form-outer-container"]}>
      <Avatar
        className={Styles["post-form-avatar"]}
        {...stringAvatar(username)}
      ></Avatar>
      <div className={Styles["post-form-container"]}>
        <textarea
          placeholder="Whats Happening?"
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
    </div>
  );
};

export default PostForm;
