const baseURL = "http://localhost:4000";
let headersList = {
  "Content-Type": "application/json",
};

const getAllUserPosts = async () => {
  const url = baseURL + "/posts/all";
  let res = await fetch(url, {
    method: "GET",
    headers: headersList,
    credentials: "include",
  });
  let jsonRes = await res.json();
  console.log(jsonRes);
  return jsonRes;
};

export { getAllUserPosts };
