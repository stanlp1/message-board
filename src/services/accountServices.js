import { baseURL, headersList } from "./postServices";

let userLogin = async (user, pass) => {
  let url = baseURL + "/account/login";
  let body = {
    user,
    pass,
  };
  const result = await fetch(url, {
    credentials: "include",
    method: "POST",
    headers: headersList,
    body: JSON.stringify(body),
  });
  // console.log(result);
  return result;
};

let userRegister = async (user, pass) => {
  let url = baseURL + "/account/register";
  let body = {
    user,
    pass,
  };
  const result = await fetch(url, {
    method: "POST",
    headers: headersList,
    body: JSON.stringify(body),
  });
  return result;
};

let userLogout = async () => {
  let url = baseURL + "/account/logout";
  const result = await fetch(url, {
    method: "POST",
    headers: headersList,
    credentials: "include",
  });
  return result;
};
export { userRegister, userLogin, userLogout };
