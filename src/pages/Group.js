import React, { useEffect } from "react";

import GroupItem from "../features/Group/GroupItem";
import { getGroupByUserId } from "../redux/userRequest";
import { loginSuccess } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../http/createInstance";

function Group() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    const groupUser = async () => {
      await getGroupByUserId(user?.accessToken, dispatch, axiosJWT);
    }

    groupUser()
    .catch(console.error);

    return () => {
      groupUser();
    }

  }, [axiosJWT, dispatch, user]);
  
  return (
    <GroupItem />
  );
}

export default Group;
