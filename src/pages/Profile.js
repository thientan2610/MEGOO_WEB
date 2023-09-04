import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createAxios } from "../http/createInstance";

import SidebarLayout from "../layout/SidebarLayout";
import dataProfile from "../data/profile.js";
import { GetGroupSuperUser } from "../redux/packageRequest";
import { loginSuccess } from "../redux/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const selectedProfile = useSelector((state) => state?.package?.profileID);
  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    const getMyPackages = async () => {
      await GetGroupSuperUser(
        user?.accessToken,
        dispatch,
        axiosJWT
      );
    };

    getMyPackages().catch(console.error);

    return () => {
      getMyPackages();
    }
  }, [axiosJWT, dispatch, user?.accessToken]);

  return (
    <SidebarLayout
      data={dataProfile}
      title="profile"
      selectedID={selectedProfile}
    >
      {dataProfile.map((route) =>
        route ? (
          route._id === selectedProfile ? (
            <Fragment key={route._id}> {route.action} </Fragment>
          ) : null
        ) : null
      )}
    </SidebarLayout>
  );
}

export default Profile;
