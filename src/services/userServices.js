export const baseURL = "https://safe-wave-92099.herokuapp.com";
export let headersList = {
  "Content-Type": "application/json",
};
const getSuggestedUsers = async () => {
  const url = baseURL + "/user/suggestedUsers";
  let res = await fetch(url, {
    type: "cors",
    method: "GET",
    headers: headersList,
    credentials: "include",
  });
  let jsonRes = await res.json();
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
