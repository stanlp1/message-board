import { useState } from "react";
import { useGetCommentsQuery } from "../../reducers/apiSlice";
import Styles from "./Post.module.css";
import PostComments from "./PostComments";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Modal } from "@mui/material";
import { Avatar } from "@mui/material";
import { stringAvatar } from "./PostForm";
import {
  PostType,
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../reducers/apiSlice";
import { useHistory } from "react-router";
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

const Post = ({ post }: { post: PostType }) => {
  const [open, setOpen] = useState(false);
  // const [comments, setComments] = useState<
  //   { screen_name: string; username: string; content: string }[]
  // >([]);
  const {
    data: comments,
    isLoading,
    isSuccess,
    refetch,
  } = useGetCommentsQuery(post.post_id);
  const history = useHistory();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [comVis, setComVis] = useState(false);
  const createdDate = new Date(
    new Date(post.created_at).toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    })
  );
  const currentDate = new Date();
  const timeDiff = Math.round(
    Math.abs(createdDate.getTime() - currentDate.getTime()) / 36e5
  );
  //console.log(createdDate, currentDate, timeDiff);
  const handleLike = (e: any) => {
    e.stopPropagation();
    likePost(post.post_id);

    //dispatch(updateLikePost(post_id));
  };

  const handleDislike = (e: any) => {
    e.stopPropagation();
    unlikePost(post.post_id);
  };

  // const refreshComments = async () => {
  //   let coms = await getComments(post.post_id);
  //   console.log(coms);
  //   setComments(coms);
  // };
  const toggleComments = async () => {
    // if (!comVis) refreshComments();
    setComVis(!comVis);
  };

  const handleRedirectProfile = async () => {
    history.push(`/profile/${post.username}`);
  };
  return (
    <div onClick={toggleComments} className={Styles["post-outer-container"]}>
      <Avatar
        className={Styles["post-avatar"]}
        {...stringAvatar(post.username)}
      />
      <div className={Styles["post-container"]}>
        <div>
          <div className={Styles["post-header"]}>
            <div
              onClick={handleRedirectProfile}
              className={Styles["user-name-container"]}
            >
              <div className={Styles.screenname}>{post.screen_name}</div>
              <div className={Styles.username}>@{post.username}</div>
              <div className={Styles.username}>
                {timeDiff > 24
                  ? `${months[createdDate.getMonth()]} ${createdDate.getDate()}`
                  : `${timeDiff}h`}
              </div>
            </div>
          </div>
          <p>{post.content}</p>
          {post.image_url !== null && (
            <img
              onClick={() => setOpen(true)}
              className={Styles["post-image"]}
              src={post.image_url}
              alt={post.username}
            ></img>
          )}
          <div className={Styles["post-footer"]}>
            <div
              className={`${Styles["comment-ind-container"]} ${Styles["action-item-container"]} `}
            >
              <CommentIcon className={Styles["action-icon"]}></CommentIcon>
              <span>{post.comment_count}</span>
            </div>

            <div
              className={`
                ${
                  post.liked
                    ? Styles["material-icon-heart"]
                    : Styles["material-icon-border-heart"]
                } ${Styles["action-item-container"]}`}
            >
              {post.liked ? (
                <FavoriteIcon
                  className={Styles["action-icon"]}
                  onClick={handleDislike}
                />
              ) : (
                <FavoriteBorderIcon
                  className={Styles["action-icon"]}
                  onClick={handleLike}
                />
              )}
              <span>{post.like_count}</span>
            </div>
          </div>
        </div>
        {comVis && (
          <PostComments
            refreshCom={refetch}
            post_id={post.post_id}
            comments={comments}
          ></PostComments>
        )}
        {post.image_url !== null && (
          <Modal open={open} onClose={() => setOpen(false)}>
            <img
              className={Styles["modal-image"]}
              src={post.image_url}
              alt={post.username}
            ></img>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Post;
