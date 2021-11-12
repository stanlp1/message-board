import { useEffect, useState } from "react";
import { getComments } from "../../services/postServices";
import { useAppDispatch } from "../../app/hooks";
import Styles from "./Post.module.css";
import PostComments from "./PostComments";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { updateLikePost, updateUnlikePost } from "../../reducers/feedSlice";
import { Modal } from "@mui/material";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Post = ({
  post_id,
  content,
  username,
  created_at,
  liked,
  image_url,
  like_count,
  comment_count,
}: {
  post_id: number;
  content: string;
  username: string;
  created_at: string;
  liked: boolean;
  image_url: string;
  like_count: number;
  comment_count: number;
}) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<
    { username: string; content: string }[]
  >([]);
  const [comVis, setComVis] = useState(false);
  const dispatch = useAppDispatch();
  const createdDate = new Date(created_at);
  const currentDate = new Date();
  const timeDiff = Math.round(
    Math.abs(createdDate.getTime() - currentDate.getTime()) / 36e5
  );
  const handleLike = (e: any) => {
    e.stopPropagation();
    dispatch(updateLikePost(post_id));
  };

  const handleDislike = (e: any) => {
    e.stopPropagation();
    dispatch(updateUnlikePost(post_id));
  };

  const refreshComments = async () => {
    let coms = await getComments(post_id);
    console.log(coms);
    setComments(coms);
  };
  const toggleComments = async () => {
    if (!comVis) refreshComments();
    setComVis(!comVis);
  };

  return (
    <div className={Styles["post-container"]}>
      <div onClick={toggleComments}>
        <div className={Styles["post-header"]}>
          <p>{username}</p>
          <p>
            {timeDiff > 24
              ? `${months[createdDate.getMonth()]} ${createdDate.getDay()}`
              : `${timeDiff}h ago`}
          </p>
        </div>
        <p>{content}</p>
        {image_url !== null && (
          <img
            onClick={() => setOpen(true)}
            className={Styles["post-image"]}
            src={image_url}
            alt={username}
          ></img>
        )}
        <div className={Styles["post-footer"]}>
          <div className={Styles["comment-ind-container"]}>
            <CommentIcon></CommentIcon>
            <span>{comment_count}</span>
          </div>

          <div
            className={
              liked
                ? Styles["material-icon-heart"]
                : Styles["material-icon-border-heart"]
            }
          >
            {liked ? (
              <FavoriteIcon onClick={handleDislike} />
            ) : (
              <FavoriteBorderIcon onClick={handleLike} />
            )}
            <span>{like_count}</span>
          </div>
        </div>
      </div>
      {comVis && (
        <PostComments
          refreshCom={refreshComments}
          post_id={post_id}
          comments={comments}
        ></PostComments>
      )}
      {image_url !== null && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <img
            className={Styles["modal-image"]}
            src={image_url}
            alt={username}
          ></img>
        </Modal>
      )}
    </div>
  );
};

export default Post;
