import React from "react";

import { Box, Typography } from "@mui/material";

import * as CustomComponent from "../../component/custom/CustomComponents";
import "../../assets/css/Home.scss";
import DefaultLayout from "../../layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
function HomeLayoutNoGroup({ msg }) {
  const navigate = useNavigate();

  const handleGoPackage = () => {
    navigate("package");
  };
  return (
    <DefaultLayout>
      <Box className="home-image">
        <Box className="home-go-package">
          <Typography>{msg}</Typography>
          <CustomComponent.Button1 className="btn-btn" onClick={handleGoPackage}>
            Đến trang gói dịch vụ
          </CustomComponent.Button1>
        </Box>
      </Box>
    </DefaultLayout>
  );
}

export default HomeLayoutNoGroup;
