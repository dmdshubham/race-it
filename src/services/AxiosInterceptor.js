import axios from "axios";
import Cookies from "js-cookie";
// import logout from "../components/Layout/util/logout";
let Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  "Content-Type": "application/json",
});

export const getTokenFromCookies = () => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("token");
    return token;
  }
  return undefined;
};

Api.interceptors.request.use(
  (config) => {
    if (!config.url.includes("login")) {
      const token = getTokenFromCookies();
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`, // Use standard Authorization header
        };
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.request?.responseURL?.includes("login")) {
      return Promise.reject(error);
    }
    if (
      error?.response?.status === 401 ||
      error?.response?.data?.errorCode === 403
    ) {
      // logout();
    }

    return Promise.reject(error);
  },
);

export default Api;
