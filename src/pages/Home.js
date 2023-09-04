import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultLayout from "../layout/DefaultLayout.js";
import { loginSuccess } from "../redux/authSlice.js";
import { createAxios } from "../http/createInstance.js";
// import Mapbox from "../component/mapbox/Mapbox.js";
import { getUserCart } from "../redux/packageRequest.js";
import { getGroupChannel } from "../redux/userRequest.js";
import HomeLayout from "../features/Home/HomeLayout.js";
import {
  getBillingsUser,
  getChatsUser,
  getGroupsUser,
  getTodosUser,
  getTransitionUser,
} from "../redux/homeRequest.js";
import HomeLayoutNoGroup from "../features/Home/HomeLayoutNoGroup.js";
import UserJoin from "./UserJoin.js";
import Package from "./Package.js";

function Home() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    // const getCartAndChannel = async () => {
    //   await getUserCart(
    //     user?.data.userInfo._id,
    //     user?.accessToken,
    //     dispatch,
    //     axiosJWT
    //   );

    //   await getGroupChannel(user?.accessToken, dispatch, axiosJWT);
    // };

    const getHomeGroupsUser = async () => {
      await getGroupsUser(user?.accessToken, dispatch, axiosJWT);

      await getTransitionUser(user?.data.userInfo._id, user?.accessToken, dispatch, axiosJWT);

      await getChatsUser(user?.accessToken, dispatch, axiosJWT);

      await getTodosUser(user?.accessToken, dispatch, axiosJWT);

      await getBillingsUser(user?.accessToken, dispatch, axiosJWT);
    };

    if (user !== null) {
      //getCartAndChannel().catch(console.error);
      getHomeGroupsUser().catch(console.error);
      //dispatch(loginSuccess(null));
    }

    return () => {
      //getCartAndChannel();
      getHomeGroupsUser();
    };
  }, [axiosJWT, dispatch, user]);

  return (
    <>
      <DefaultLayout>
        <HomeLayout />
      </DefaultLayout>
    </>
  );
}

export default Home;
