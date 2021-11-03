const baseURL = "http://localhost:4000/posts";
let headersList = {
  "Content-Type": "application/json",
};

const getAllUserPosts = async () => {
  const url = baseURL + "/getUserPosts";
  let res = await fetch(url, {
    method: "GET",
    headers: headersList,
    credentials: "include",
  });
  let jsonRes = await res.json();
  console.log(jsonRes);
  return jsonRes;
};

const makeNewPost = async (content) => {
  const url = baseURL + "/new";
  let body = {
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
export { getAllUserPosts, makeNewPost };
