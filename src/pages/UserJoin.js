import React from "react";
import { Stack, Box, Typography } from "@mui/material";

import * as CustomComponent from "../component/custom/CustomComponents";
import "../assets/css/Home.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTokenJoinGroup } from "../redux/authSlice";

function UserJoin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const urlParams = new URL(window.location.href).searchParams;

  if (urlParams.get("token") != null) {
    console.log(urlParams.get("token"));
    dispatch(setTokenJoinGroup(urlParams.get("token")));
  }

  const handleButtonAccept = () => {
    navigate("/login");
  };

  const handleButton = () => {
    navigate("/package");
  };
  return (
    <Stack className="home-image">
      <Typography className="text-user-join">Bạn có một lời mời tham gia nhóm</Typography>
      <Box className="btn-user-join">
        <CustomComponent.Button1 className="btn-btn" onClick={handleButtonAccept}>
          Đồng ý
        </CustomComponent.Button1>
        <CustomComponent.Button1 className="btn-btn" onClick={handleButton}>
          Quay về trang chủ
        </CustomComponent.Button1>
      </Box>
    </Stack>
  );
}

export default UserJoin;
