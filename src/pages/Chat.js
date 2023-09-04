import React, { useEffect } from "react";

import "../assets/css/Chat.scss";
// import { Colors } from "../config/Colors";
// import * as CustomComponent from "../component/custom/CustomComponents.js";
// import { RiSendPlane2Fill } from "react-icons/ri";
// import AttachFileIcon from "@mui/icons-material/AttachFile";

import DefaultLayout from "../layout/DefaultLayout.js";
// import ChatLayout from "../features/Chat/ChatLayout.js";

import { createAxios } from "../http/createInstance";

import { useDispatch, useSelector } from "react-redux";

import { getGroupChannel } from "../redux/userRequest";
import { loginSuccess } from "../redux/authSlice";
import ChatItem from "../features/Chat/ChatItem";

function Chat() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    const getChannelUrls = async () => {
      await getGroupChannel(user?.accessToken, dispatch, axiosJWT);
    };

    getChannelUrls().catch(console.error);

    return () => {
      getChannelUrls();
    }

  }, [axiosJWT, dispatch, user?.accessToken]);

  return (
    <DefaultLayout>
      <ChatItem />
    </DefaultLayout>
  );
}

export default Chat;
