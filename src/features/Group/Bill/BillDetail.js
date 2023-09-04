import React, { useState } from "react";

import {
  MenuItem,
  Select,
  FormControl,
  Avatar,
  Box,
  Stack,
  Typography,
  InputBase,
  Modal,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { createAxios } from "../../../http/createInstance";

import "../../../assets/css/Bill.scss";
import * as CustomComponent from "../../../component/custom/CustomComponents.js";
import * as FormatNumber from "../../../component/custom/FormatDateNumber.js";
import {
  deletePackageBill,
  postDoubleCheck,
  updatePackageBill,
} from "../../../redux/userRequest";
import { loginSuccess } from "../../../redux/authSlice";
import {
  updateMessage,
  updateOpenSnackbar,
  updateProgress,
  updateStatus,
} from "../../../redux/messageSlice";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Colors } from "../../../config/Colors";
import CurrencyInput from "react-currency-input-field";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "15px",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function BillDetail({ grID, handleClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const userInfo = useSelector((state) => state?.user?.userInfo.user);
  const bill = useSelector((state) => state?.package.bill);

  const initalChange = () => {
    let arr = [];
    for (let x of bill?.borrowers) {
      let formData = {
        _id: x.borrower._id,
        amount: x.amount,
        status: x.status,
      };
      arr.push(formData);
    }
    return arr;
  };
  const initalData = initalChange();
  const [data, setData] = useState(initalChange());
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseDeleted = () => setOpen(false);

  const handleChangeStatus = (event, idx) => {
    let arr = [];
    for (let x of data) {
      let formData = {
        _id: x._id,
        amount: x.amount,
        status: x.status,
      };
      if (x._id === idx) {
        formData.status = event.target.value;
      }
      arr.push(formData);
    }
    setData(arr);
  };

  const handleChangeAmount = (e, idx) => {
    let arr = [];
    for (let x of data) {
      let formData = {
        _id: x._id,
        amount: x.amount,
        status: x.status,
      };
      if (x._id === idx) {
        formData.amount = e.target.value;
      }
      arr.push(formData);
    }
    setData(arr);
  };

  const handleDeleteBill = async () => {
    handleCloseDeleted();
    dispatch(updateProgress(true));
    const res = await deletePackageBill(
      grID,
      bill._id,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    if (res != null) {
      dispatch(updateProgress(false));
      if (res?.statusCode === 200) {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Xóa chi tiêu thành công!"));
      } else {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Xóa chi tiêu thất bại!"));
      }
    }
  };

  const handleNotification = async (e, user) => {
    let formData = {
      to_user: user,
    };
    console.log(formData);
    console.log(bill._id);
    handleClose();
    dispatch(updateProgress(false));
    const res = await postDoubleCheck(
      bill._id,
      formData,
      user?.accessToken,
      axiosJWT
    );

    if (res === true) {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(true));
      dispatch(updateMessage("Lời nhắc nhở đã được gửi thành công!"));
    } else {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(false));
      dispatch(updateMessage("Lời nhắc nhở đã được gửi không thành công!"));
    }
  };

  const handleUpdateBill = async () => {
    let checkAmount = false;
    let checkStatus = false;
    for (let el1 of data) {
      for (let el2 of initalData) {
        if (el1._id === el2._id && el1.amount !== el2.amount) {
          checkAmount = true;
        }
        if (el1._id === el2._id && el1.status !== el2.status) {
          checkStatus = true;
        }
      }
    }

    if (checkAmount === false && checkStatus === false) {
      return;
    }

    handleClose();
    dispatch(updateProgress(true));
    let borrowersAmount = [];
    let borrowersStatus = [];
    for (let x of data) {
      let formAmount = {
        borrower: x._id,
        amount: x.amount,
      };
      let formStatus = {
        borrower: x._id,
        status: x.status,
      };
      borrowersAmount.push(formAmount);
      borrowersStatus.push(formStatus);
    }

    let formData1 = {
      summary: bill.summary,
      date: bill.date,
      borrowers: borrowersAmount,
      lender: bill?.lender._id,
      description: bill?.description,
    };

    let formData2 = {
      borrowers: borrowersStatus,
    };

    const res = await updatePackageBill(
      grID,
      bill._id,
      formData1,
      checkAmount,
      formData2,
      checkStatus,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    if (res != null) {
      dispatch(updateProgress(false));
      if (res === true) {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Chỉnh sửa chi tiêu thành công!"));
      } else {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Chỉnh sửa chi tiêu thất bại!"));
      }
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h4">{bill?.summary}</Typography>
      <Stack spacing={2} id="modalBillDetail" className="modalModalBillDetail">
        <Typography variant="subtitle1">
          {FormatNumber.formatDate(bill?.date)}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
          {bill?.description}
        </Typography>
        <Box className="box-status-noti">
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 550 }}>
              Nguời chi trả:
            </Typography>
            <Typography sx={{ marginLeft: "10px" }}>
              {bill?.lender.name}
            </Typography>
          </Box>
          {userInfo._id !== bill?.lender._id ? (
            <Tooltip title="Nhắc nhở">
              <IconButton
                onClick={(e) => handleNotification(e, bill?.lender._id)}
              >
                <CircleNotificationsIcon
                  sx={{
                    marginLeft: "5px",
                    fontSize: "35px",
                    color: Colors.textPrimary,
                  }}
                />
              </IconButton>
            </Tooltip>
          ) : null}
        </Box>
        {bill?.borrowers.map((route, idx) =>
          route ? (
            <Box className="detail-bill-member" key={idx}>
              <Box
                flex={2}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar src={route.borrower.avatar} />
                <Typography sx={{ paddingLeft: "10px" }}>
                  {route.borrower.name}
                </Typography>
              </Box>
              <Box flex={1}>
                {userInfo._id === bill?.lender._id ? (
                  <InputBase
                    value={data[idx].amount}
                    onChange={(e) => handleChangeAmount(e, route.borrower._id)}
                  />
        //           <CurrencyInput
        //   id="input-example"
        //   className="currency-input"
        //   value={data[idx].amount}
        //   decimalsLimit={2}
        //   onValueChange={(value) => setMoney(value)}
        // />
                ) : (
                  <Typography>
                    {FormatNumber.formatCurrency(data[idx].amount)}
                  </Typography>
                )}
              </Box>
              {userInfo._id === bill?.lender._id ? (
                <Box className="box-status-noti">
                  <FormControl
                    sx={{
                      width: "130px",
                      backgroundColor:
                        data[idx].status === "PENDING"
                          ? "#ccffdd"
                          : data[idx].status === "APPROVED"
                          ? "#ccf5ff"
                          : "#f2f2f2",

                      borderColor:
                        data[idx].status === "PENDING"
                          ? "#ccffdd"
                          : data[idx].status === "APPROVED"
                          ? "#ccf5ff"
                          : "#f2f2f2",
                    }}
                  >
                    <Select
                      labelId="demo-simple-select-status"
                      id="demo-simple-status"
                      size="small"
                      value={data[idx].status}
                      onChange={(event) =>
                        handleChangeStatus(event, route.borrower._id)
                      }
                    >
                      <MenuItem value={"PENDING"}>
                        <Typography
                          sx={{
                            color: "#008000",
                            fontWeight: 550,
                          }}
                        >
                          PENDING
                        </Typography>
                      </MenuItem>
                      <MenuItem value={"APPROVED"}>
                        <Typography
                          sx={{
                            color: "#0000cc",
                            fontWeight: 550,
                          }}
                        >
                          APPROVED
                        </Typography>
                      </MenuItem>
                      <MenuItem value={"CANCELED"}>
                        <Typography
                          sx={{
                            color: "#000000",
                            fontWeight: 550,
                          }}
                        >
                          CANCELED
                        </Typography>
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Tooltip title="Nhắc nhở">
                    <IconButton
                      onClick={(e) => handleNotification(e, route.borrower._id)}
                    >
                      <CircleNotificationsIcon
                        sx={{
                          marginLeft: "5px",
                          fontSize: "35px",
                          color: Colors.textPrimary,
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "130px",
                    backgroundColor:
                      route.status === "PENDING"
                        ? "#ccffdd"
                        : route.status === "APPROVED"
                        ? "#ccf5ff"
                        : "#f2f2f2",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      color:
                        route.status === "PENDING"
                          ? "#008000"
                          : route.status === "APPROVED"
                          ? "#0000cc"
                          : "#000000",
                      fontWeight: 550,
                    }}
                  >
                    {route.status}
                  </Typography>
                </Box>
              )}
            </Box>
          ) : null
        )}
        {userInfo._id === bill?.lender._id ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ paddingRight: "5px" }}>
              <CustomComponent.Button2 onClick={handleOpen}>
                Xóa
              </CustomComponent.Button2>
            </Box>
            <Box sx={{ paddingLeft: "5px" }}>
              <CustomComponent.Button1 onClick={handleUpdateBill}>
                Lưu thay đổi
              </CustomComponent.Button1>
            </Box>
          </Box>
        ) : null}
      </Stack>
      <Modal open={open} onClose={handleCloseDeleted}>
        <Box sx={style}>
          <Typography>Bạn có muốn xóa chi tiêu này không?</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CustomComponent.Button1
              sx={{ width: "40px", marginRight: "10px" }}
              onClick={handleDeleteBill}
            >
              Có
            </CustomComponent.Button1>
            <CustomComponent.Button2
              sx={{ width: "40px", marginLeft: "10px" }}
              onClick={handleCloseDeleted}
            >
              Không
            </CustomComponent.Button2>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default BillDetail;
