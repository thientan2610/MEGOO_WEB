import React from "react";
import {Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setTokenJoinGroup } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

import "../../assets/css/Home.scss";
// import { Colors } from "../../config/Colors";
import * as CustomComponent from "../../component/custom/CustomComponents.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
function Modal() {
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
    navigate("/");
  };
  return (
    <Box sx={style} className="modal-user-join">
      <Box flex={2}>
        <CustomComponent.Button2 onClick={handleButtonAccept}>
          Đồng ý
        </CustomComponent.Button2>
      </Box>
      <Box flex={2}>
        <CustomComponent.Button2 onClick={handleButton}>
          Quay lại trang chủ
        </CustomComponent.Button2>
      </Box>
    </Box>
  );
}

export default Modal;