import React from "react";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import "../../assets/css/Home.scss";
import ClearIcon from "@mui/icons-material/Clear";
import { FaMoneyBillWave } from "react-icons/fa";
import ShortTextIcon from "@mui/icons-material/ShortText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { Colors } from "../../config/Colors";
import * as FormatNumber from "../../component/custom/FormatDateNumber";
import { useDispatch } from "react-redux";
import { updateHomeBilling } from "../../redux/homeSlice";

function BoxNotification({ bill, homeBilling }) {
  const dispatch = useDispatch();
  const handleClearBill = () => {
    let arr = [...homeBilling];
    arr = [...arr.filter((x) => x._id !== bill._id)];
    dispatch(updateHomeBilling(arr));
  };
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "20px",
        maxWidth: "300px",
      }}
    >
      <Box flex={3} sx={{ display: "flex", flexDirection: "column" }}>
        <CardHeader
          avatar={
            <AttachMoneyIcon
              sx={{
                color: Colors.textPrimary,
                borderRadius: "50%",
                backgroundColor: Colors.btnOutline,
                padding: "5px",
              }}
            />
          }
          title={bill.summary}
          subheader={FormatNumber.formatDate(bill.date)}
          action={
            <IconButton onClick={handleClearBill}>
              <ClearIcon sx={{ color: Colors.error }} />
            </IconButton>
          }
        />
        <CardContent>
          <Box className="box-date">
            <FaMoneyBillWave />
            <Typography variant="h5" component="div" sx={{ marginLeft: "5px" }}>
              {FormatNumber.formatCurrency(bill.total)}
            </Typography>
          </Box>
          <Box className="box-date">
            <ShortTextIcon />
            <Typography
              variant="body2"
              color="text.secondary"
              className="box-datetime"
            >
              {bill.description}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}

export default BoxNotification;
