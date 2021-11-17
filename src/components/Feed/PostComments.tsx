import { useState } from "react";
import Styles from "./PostComments.module.css";
import postStyles from "./Post.module.css";
import { useHistory } from "react-router";
import { useCreateCommentMutation } from "../../reducers/apiSlice";
const PostComments = ({
  comments,
  post_id,
  refreshCom,
}: {
  refreshCom: () => void;
  post_id: number;
  comments: { screen_name: string; username: string; content: string }[];
}): JSX.Element => {
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const history = useHistory();
  const [postContent, setPostContent] = useState("");
  const handleNewComment = async () => {
    createComment({ post_id, content: postContent });
  };

  const handleKeyPress = async (e: any) => {
    if (e.which === 13) {
      e.preventDefault();
      handleNewComment();
      //refreshCom();
    }
  };
  return (
    <div className={Styles["comments-container"]}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={Styles["comments-input-container"]}
      >
        <textarea
          onKeyPress={handleKeyPress}
          onChange={(e) => setPostContent(e.target.value)}
          className={Styles["comments-input"]}
        ></textarea>
      </div>

      {comments.map((comment) => (
        <div className={Styles["comments-comment"]}>
          <div
            onClick={() => history.push(`/profile/${comment.username}`)}
            className={postStyles["user-name-container"]}
          >
            <div className={postStyles.screenname}>{comment.screen_name}</div>
            <div className={postStyles.username}>@{comment.username}</div>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
