import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { RiShoppingBasket2Line } from "react-icons/ri";

import { Colors } from "../../config/Colors";
import * as CustomComponents from "../../component/custom/CustomComponents.js";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Home.scss";
import DefaultLayout from "../../layout/DefaultLayout";

function ShoppingCartEmpty() {
  const navigate = useNavigate();
  const handleGoPackage = () => {
    navigate("/package");
  };
  return (
    <DefaultLayout>
      <Box className="home-image">
      <Box className="home-go-package">
        <RiShoppingBasket2Line color={Colors.textPrimary} size={"15%"} />
        <Typography>Không có sản phẩm nào trong giỏ hàng của bạn</Typography>
        <CustomComponents.Button1 className="btn-btn" onClick={handleGoPackage}>
          Mua ngay
        </CustomComponents.Button1>
      </Box>
    </Box>
    </DefaultLayout>
  );
}

export default ShoppingCartEmpty;
