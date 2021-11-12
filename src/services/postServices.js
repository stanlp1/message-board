export const baseURL = "https://safe-wave-92099.herokuapp.com";
export let headersList = {
  "Content-Type": "application/json",
};

const getAllUserPosts = async () => {
  const url = baseURL + "/posts/getUserPosts";
  let res = await fetch(url, {
    method: "GET",
    headers: headersList,
    credentials: "include",
  });
  let jsonRes = await res.json();
  // console.log(jsonRes);
  return jsonRes;
};

const getAllSubscribedPosts = async () => {
  const url = baseURL + "/posts/getSubscribedPosts";
  let res = await fetch(url, {
    method: "GET",
    headers: headersList,
    credentials: "include",
  });
  let jsonRes = await res.json();
  return jsonRes;
};

const getAllPosts = async () => {
  const url = baseURL + "/posts/getAllPosts";
  let res = await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: headersList,
    credentials: "include",
  });
  let jsonRes = await res.json();
  // console.log(jsonRes);
  return jsonRes;
};
const makeNewPost = async (content, image) => {
  const url = baseURL + "/posts/new";
  let body = {
    content,
    image,
  };
  let res = await fetch(url, {
    method: "POST",
    headers: headersList,
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res;
};

const likePost = async (post_id) => {
  const url = baseURL + "/posts/likePost";
  let body = {
    post_id,
  };
  let res = await fetch(url, {
    method: "POST",
    headers: headersList,
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res;
};

const unlikePost = async (post_id) => {
  const url = baseURL + "/posts/unlikePost";
  let body = {
    post_id,
  };
  let res = await fetch(url, {
    method: "POST",
    headers: headersList,
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res;
};

const createComment = async (post_id, content) => {
  const url = baseURL + "/posts/createComment";
  let body = {
    post_id,
    content,
  };
  let res = await fetch(url, {
    method: "POST",
    headers: headersList,
    credentials: "include",
    body: JSON.stringify(body),
  });
  return res;
};

const getComments = async (post_id) => {
  const url = baseURL + `/posts/${post_id}/comments`;
  let res = await fetch(url, {
    method: "GET",
    headers: headersList,
    credentials: "include",
  });
  return await res.json();
};
export {
  getAllUserPosts,
  makeNewPost,
  getAllSubscribedPosts,
  getAllPosts,
  likePost,
  getComments,
  createComment,
  unlikePost,
};
