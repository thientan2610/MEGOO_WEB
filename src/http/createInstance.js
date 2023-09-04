import apiClient from "./http-common.js";
import jwtDecode from "jwt-decode";

const refeshToken = async () => {
  try {
    const res = await apiClient.get("/auth/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = apiClient.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let day = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < day.setTime() / 1000) {
        const data = await refeshToken();
        const refeshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refeshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return newInstance;
};
