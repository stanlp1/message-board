import React from "react";
import { useEffect, useState } from "react";
import { getAllUserPosts } from "../../services/postServices";
import { useAppSelector } from "../../app/hooks";

const Feed = (): JSX.Element => {
  const [posts, setPosts] = useState<{ content: String }[]>([]);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user !== "") {
      getAllUserPosts().then((posts) => setPosts(posts));
    }
  }, [user]);

  if (posts.length !== 0) {
    console.log(posts);
    return (
      <div>
        {posts.map((post) => (
          <div>{post.content}</div>
        ))}
      </div>
    );
  }
  return <div>No Posts</div>;
};

export default Feed;
