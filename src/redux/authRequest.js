import apiClient from "../http/http-common";
import { setTokenJoinGroup } from "./authSlice";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerFailed,
  registerSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "./authSlice";

import { getAllPackage, getUserCart } from "./packageRequest";
import { updateProfileId } from "./packageSlice";
import { getInformationUser } from "./userRequest";

export const getJoinGroup = async (token, tokenJoinGr) => {
  try {
    const res = await apiClient.get("/pkg-mgmt/gr/join", {
      params: {
        token: tokenJoinGr,
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (
  user,
  dispatch,
  navigate,
  tokenJoinGr,
  axiosJWT
) => {
  dispatch(loginStart());
  try {
    const res = await apiClient.post("/auth/login", user, {
      withCredentials: true,
    });
    dispatch(loginSuccess(res?.data));

    if (tokenJoinGr !== "") {
      const resJoin = await getJoinGroup(res.data.accessToken, tokenJoinGr);
      console.log(resJoin);
    }

    await getInformationUser(
      res?.data.data.userInfo._id,
      res?.data.accessToken,
      dispatch,
      axiosJWT
    );

    dispatch(setTokenJoinGroup(""));

    console.log(res?.data);

    // await getAllPackage(dispatch);

    // await getUserCart(
    //   res?.data.data.userInfo._id,
    //   res?.data.accessToken,
    //   dispatch,
    //   axiosJWT
    // );

    dispatch(updateProfileId(1));
    navigate("/");
    return true;
  } catch (error) {
    dispatch(loginFailed(error.response.data));
    return false;
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await apiClient.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    navigate("/login");
  } catch (error) {
    dispatch(registerFailed(error.response.data));
  }
};

export const getValidateGG = async (token, dispatch, navigate, axiosJWT) => {
  try {
    const res = await apiClient.get("/auth/validate", {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res?.data);

    let formData = {
      accessToken: token,
      data: res?.data,
    };

    dispatch(loginSuccess(formData));

    await getInformationUser(
      res?.data?.userInfo._id,
      token,
      dispatch,
      axiosJWT
    );

    navigate("/");
  } catch (error) {
    return error.response.data;
  }
};

export const logoutUser = async (token, dispatch, navigate, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post("/auth/logout", {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(logoutSuccess(null));
    navigate("/login");
  } catch (error) {
    dispatch(logoutFailed());
  }
};
