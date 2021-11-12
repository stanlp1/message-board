import { useState } from "react";
import { createComment } from "../../services/postServices";
import Styles from "./PostComments.module.css";

const PostComments = ({
  comments,
  post_id,
  refreshCom,
}: {
  refreshCom: () => Promise<void>;
  post_id: number;
  comments: { username: string; content: string }[];
}): JSX.Element => {
  const [postContent, setPostContent] = useState("");
  const handleNewComment = async () => {
    createComment(post_id, postContent);
  };

  const handleKeyPress = async (e: any) => {
    if (e.which === 13) {
      e.preventDefault();
      await handleNewComment();
      refreshCom();
    }
  };
  return (
    <div className={Styles["comments-container"]}>
      <div className={Styles["comments-input-container"]}>
        <textarea
          onKeyPress={handleKeyPress}
          onChange={(e) => setPostContent(e.target.value)}
          className={Styles["comments-input"]}
        ></textarea>
      </div>

      {comments.map((comment) => (
        <div className={Styles["comments-comment"]}>
          {comment.username}
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
