import Cookies from "js-cookie";

export const setAuthCookies = (data: any): void => {
  Cookies.set("isLoggedIn", "true", {
    expires: 360,
    path: "/",
    sameSite: "strict",
  });
  Cookies.set("token", data?.token?.access, {
    expires: 360,
    path: "/",
    sameSite: "strict",
  });
  Cookies.set("attributes", JSON.stringify(data?.attributes), {
    expires: 360,
    path: "/",
    sameSite: "strict",
  });
};
