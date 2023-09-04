import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultLayout from "../layout/DefaultLayout.js";
import { loginSuccess } from "../redux/authSlice.js";
import { createAxios } from "../http/createInstance.js";
import { getValidateGG } from "../redux/authRequest.js";
import { useNavigate } from "react-router-dom";

function HomeGG() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlQuery = new URL(window.location.href).searchParams;

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    let token = "";
    const inforOfUser = async (token) => {
      await getValidateGG(token?.accessToken, dispatch, navigate, axiosJWT);
    };

    const queryToken = urlQuery.get("accessToken");

    if (queryToken != null) {
      let query = queryToken.slice(0, queryToken.indexOf("?"));
      token = {
        accessToken: query,
      };

      console.log(token?.accessToken);

      inforOfUser(token).catch(console.error);
    }
  }, [axiosJWT, dispatch, navigate, urlQuery, user]);

  return (
    <>
      <DefaultLayout>
        <></>
      </DefaultLayout>
    </>
  );
}

export default HomeGG;
