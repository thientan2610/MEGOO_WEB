import React from "react";

import { Box, Typography } from "@mui/material";

import ZaloPay from "../../assets/img/ZaloPay.png";
import VnPay from "../../assets/img/VNPAY.png";

function MethodPay({ title }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
        <img src={title === "Zalo" ? ZaloPay : VnPay} alt={title} width={"70px"} height={"auto"} />
    </Box>
  );
}

export default MethodPay;
