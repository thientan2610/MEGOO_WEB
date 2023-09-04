import React from "react";

import { Box } from "@mui/material";
import Bill from "../Bill";

import "../../assets/css/Bill.scss";
import { useSelector } from "react-redux";

function ListBill() {
  const listBill = useSelector((state) => state?.package?.bill);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {listBill?.map((bill) =>
        bill ? <Bill key={bill._id} item={bill} /> : null
      )}
    </Box>
  );
}

export default ListBill;
