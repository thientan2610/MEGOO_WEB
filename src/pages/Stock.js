import React, { useEffect } from "react";

import { createAxios } from "../http/createInstance";

// import DefaultLayout from "../layout/DefaultLayout.js";
import { getGroupActivedByUserId } from "../redux/stockRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice.js";
import StockLayout from "../features/Stock/StockLayout";

function Stock() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  useEffect(() => {
    const getStock = async () => {
      await getGroupActivedByUserId(user?.accessToken, dispatch, axiosJWT);
    };

    getStock().catch(console.error);

    return () => {
      getStock();
    };
  }, [axiosJWT, dispatch, user]);
  return (
    <StockLayout />
  );
}

export default Stock;
