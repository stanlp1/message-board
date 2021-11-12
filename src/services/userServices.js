import { baseURL, headersList } from "./postServices";

const getSuggestedUsers = async () => {
  const url = baseURL + "/user/suggestedUsers";
  let res = await fetch(url, {
    type: "cors",
    method: "GET",
    headers: headersList,
    credentials: "include",
  });
  let jsonRes = await res.json();
  // console.log(jsonRes);
  return jsonRes;
};

const followUser = async (target) => {
  const url = baseURL + "/user/followUser";
  const body = {
    target: target,
  };
  let res = await fetch(url, {
    method: "POST",
    headers: headersList,
    credentials: "include",
    body: JSON.stringify(body),
  });
  let jsonRes = await res.json();
  return jsonRes;
};

export { getSuggestedUsers, followUser };
