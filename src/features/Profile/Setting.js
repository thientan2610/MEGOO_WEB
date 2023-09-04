import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import SettingsPhoneOutlinedIcon from "@mui/icons-material/SettingsPhoneOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

import { createAxios } from "../../http/createInstance";

import "../../assets/css/Content.scss";
import { Colors } from "../../config/Colors.js";
import * as Custom from "../../component/custom/CustomComponents.js";
import ButtonSetting from "../../component/noti/ButtonSetting";
import { updateSettingUser } from "../../redux/userRequest";
import { loginSuccess } from "../../redux/authSlice";

function Setting() {
  const user = useSelector((state) => state?.auth.login?.currentUser);
  const userInfo = useSelector((state) => state?.user?.userInfo.user);

  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [stockNoti, setStockNoti] = useState(userInfo?.setting.stockNoti);
  const [newsNoti, setNewsNoti] = useState(userInfo?.setting.newsNoti);
  const [callNoti, setCallNoti] = useState(userInfo?.setting.callNoti);
  const [chatNoti, setChatNoti] = useState(userInfo?.setting.msgNoti);

  const handleButtonStock = async () => {
    setStockNoti(!stockNoti);

    let formData = {
      stockNoti: !stockNoti,
      newsNoti: newsNoti,
      callNoti: callNoti,
      msgNoti: chatNoti,
    };

    console.log(formData);

    await updateSettingUser(
      user?.data.userInfo._id,
      user?.accessToken,
      formData,
      dispatch,
      axiosJWT
    );
  };

  const handleButtonNews = async () => {
    setNewsNoti(!newsNoti);

    let formData = {
      stockNoti: stockNoti,
      newsNoti: !newsNoti,
      callNoti: callNoti,
      msgNoti: chatNoti,
    };

    console.log(formData);

    await updateSettingUser(
      user?.data.userInfo._id,
      user?.accessToken,
      formData,
      dispatch,
      axiosJWT
    );
  };

  const handleButtonCall = async () => {
    setCallNoti(!callNoti);

    let formData = {
      stockNoti: stockNoti,
      newsNoti: newsNoti,
      callNoti: !callNoti,
      msgNoti: chatNoti,
    };

    console.log(formData);

    await updateSettingUser(
      user?.data.userInfo._id,
      user?.accessToken,
      formData,
      dispatch,
      axiosJWT
    );
  };

  const handleButtonChat = async () => {
    setChatNoti(!chatNoti);

    let formData = {
      stockNoti: stockNoti,
      newsNoti: newsNoti,
      callNoti: callNoti,
      msgNoti: !chatNoti,
    };

    console.log(formData);

    await updateSettingUser(
      user?.data.userInfo._id,
      user?.accessToken,
      formData,
      dispatch,
      axiosJWT
    );
  };

  return (
    <Box>
      <Typography
        variant="button"
        fontSize={"18px"}
        color={Colors.textPrimary}
        display="block"
        gutterBottom
      >
        Cài đặt thông báo
      </Typography>
      <Custom.ButtonNoti
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        // onClick={() => setStockNoti(!stockNoti)}
        onClick={handleButtonStock}
      >
        <ButtonSetting
          title="Kho hàng"
          describe="Nhận thông báo khi ..."
          isChecked={stockNoti}
        >
          <Inventory2OutlinedIcon sx={{ fontSize: 40 }} />
        </ButtonSetting>
      </Custom.ButtonNoti>
      <Custom.ButtonNoti
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        // onClick={() => setNewsNoti(!newsNoti)}
        onClick={handleButtonNews}
      >
        <ButtonSetting
          title="Quảng cáo"
          describe="Nhận thông báo khi ..."
          isChecked={newsNoti}
        >
          <NewspaperOutlinedIcon sx={{ fontSize: 40 }} />
        </ButtonSetting>
      </Custom.ButtonNoti>
      <Custom.ButtonNoti
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        // onClick={() => setCallNoti(!callNoti)}
        onClick={handleButtonCall}
      >
        <ButtonSetting
          title="Gọi điện"
          describe="Nhận thông báo khi ..."
          isChecked={callNoti}
        >
          <SettingsPhoneOutlinedIcon sx={{ fontSize: 40 }} />
        </ButtonSetting>
      </Custom.ButtonNoti>
      <Custom.ButtonNoti
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        // onClick={() => setChatNoti(!chatNoti)}
        onClick={handleButtonChat}
      >
        <ButtonSetting
          title="Tin nhắn"
          describe="Nhận thông báo khi ..."
          isChecked={chatNoti}
        >
          <ForumOutlinedIcon sx={{ fontSize: 40 }} />
        </ButtonSetting>
      </Custom.ButtonNoti>
    </Box>
  );
}

export default Setting;
