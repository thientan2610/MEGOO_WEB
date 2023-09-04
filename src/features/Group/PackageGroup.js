import React from "react";

import { Box, Button, Stack, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../http/createInstance";
import {
  updateActivatePackage,
  updateGroupChannel,
} from "../../redux/userRequest";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Group.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { Colors } from "../../config/Colors";
import { useNavigate } from "react-router-dom";

import CalculateDate from "../../component/Date/CalculateDate";
import * as SB from "../../component/Chat/SendBirdGroupChat.js";


function PackageGroup({ item, data, title }) {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.auth.login?.currentUser);

  const btn = item.status === "Not Activated" ? true : false;

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  let groupChannelMembers = [];
  const nowDate = new Date().toISOString();

  const onError = (error) => {
    console.log(error);
  };

  const handleCreateChannel = async () => {
    await SB.connectSendBird(user?.data.userInfo._id);

    groupChannelMembers.push(data.members[0].user._id);
    const [groupChannel, error] = await SB.createChannel(
      data.name,
      data.avatar,
      groupChannelMembers
    );

    if (groupChannel != null) {
      let formData = {
        channel: groupChannel.url,
      };
      await updateGroupChannel(
        data._id,
        user?.accessToken,
        formData,
        dispatch,
        axiosJWT
      );
    }

    if (error) {
      return onError(error);
    }
  };

  const handleActivatePackage = async () => {
    const res = await updateActivatePackage(
      data._id,
      user?.accessToken,
      item,
      dispatch,
      axiosJWT
    );

    if (res?.statusCode === 200) {
      await handleCreateChannel();
    }
  };

  const handleRenewGroup = async () => {
    navigate(`/group-package?groupID=${data._id}`);
  };

  return (
    <Box>
      <Stack
        spacing={1}
        sx={{
          //width: "100%",
          bgcolor: Colors.background,
          borderRadius: "10px",
          boxShadow: "2px 2px 5px #8c8c8c",
          padding: "20px",
        }}
      >
        <Box
         className="flex-group"
        >
          <Typography variant="h5" color={Colors.textPrimary}>
            Gói người dùng
          </Typography>
          {title === "SUPER USER" ? (
            <Box>
              {btn ? (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ width: "140px", borderRadius: "10px" }}
                  onClick={handleActivatePackage}
                >
                  Kích hoạt gói
                </Button>
              ) : (
                <CustomComponent.Button2
                  sx={{ width: "140px" }}
                  onClick={handleRenewGroup}
                >
                  Gia hạn gói
                </CustomComponent.Button2>
              )}
            </Box>
          ) : null}
        </Box>
        <Box className="package-group">
          <Typography
            width={"120px"}
            variant="subtitle2"
            fontSize={16}
            gutterBottom
          >
            Tên gói:
          </Typography>
          <Typography fontSize={16} gutterBottom>
            {item.package.name}
          </Typography>
        </Box>
        {btn ? (
          <Box className="package-group">
            <Typography
              width={"120px"}
              variant="subtitle2"
              fontSize={16}
              gutterBottom
            >
              Thời hạn:
            </Typography>
            <Typography fontSize={16} gutterBottom>
              {item.package.duration * 30} ngày
            </Typography>
          </Box>
        ) : (
          <Box className="package-group">
            <Typography
              width={"120px"}
              variant="subtitle2"
              fontSize={16}
              gutterBottom
            >
              Còn lại:
            </Typography>
            <Typography fontSize={16} gutterBottom>
              {CalculateDate(item.endDate, nowDate)} ngày
            </Typography>
          </Box>
        )}

        <Box className="package-group" sx={{ paddingBottom: "10px" }}>
          <Typography
            width={"120px"}
            variant="subtitle2"
            fontSize={16}
            gutterBottom
          >
            Số thành viên:
          </Typography>
          <Typography fontSize={16} gutterBottom>
            {item.package.noOfMember}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default PackageGroup;
