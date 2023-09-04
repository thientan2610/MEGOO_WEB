import React from "react";

import { Box, Typography } from "@mui/material";

import "../../assets/css/Home.scss";
import * as CustomComponent from "../../component/custom/CustomComponents";
import { useNavigate } from "react-router-dom";

function ChatEmpty() {
  const navigate = useNavigate();
  const handleGoPackage = () => {
    navigate("package");
  };
  return (
    <Box className="home-image">
      <Box className="home-go-package">
        <Typography>Hiện bạn chưa có nhóm chat nào. </Typography>
        <CustomComponent.Button1 className="btn-btn" onClick={handleGoPackage}>
          Đến trang gói dịch vụ
        </CustomComponent.Button1>
      </Box>
    </Box>
  );
}

export default ChatEmpty;
