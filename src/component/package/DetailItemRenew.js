import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Box,
  IconButton,
  Divider,
  Modal,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
  Input,
} from "@mui/material";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

import { createAxios } from "../../http/createInstance.js";
import SockectIO from "../../http/socket.js";

import { Colors } from "../../config/Colors";
import * as CustomComponents from "../custom/CustomComponents.js";
import "../../assets/css/Content.scss";
import { loginSuccess } from "../../redux/authSlice";
import {
  getGroupByUserId,
  getInformationUser,
  userRenewGroup,
} from "../../redux/userRequest.js";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #e6e6e6",
  boxShadow: 24,
  p: 4,
};

function DetailItemRenew({ item, grpId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const order = useSelector((state) => state?.auth?.order);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [member, setMember] = useState(item.noOfMember);

  const [duration, setDuration] = useState(item.duration);

  const [money, setMoney] = useState(item.price);
  const [valueMethod, setValueMethod] = useState("zalo");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    setMember(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (member < item.noOfMember) {
      setMember(item.noOfMember);
    } else if (member > 15) {
      setMember(15);
    }

    if (duration < item.duration) {
      setDuration(item.duration);
    } else if (duration > 10) {
      setDuration(10);
    }
  };

  const handleChange = (event) => {
    setValueMethod(event.target.value);
  };

  const handleCheckoutPackageRenew = async (event, item) => {
    let formData = {
      package: item._id,
      noOfMember: item.noOfMember,
      duration: item.duration,
    };

    let methodValue = {};

    if (valueMethod === "zalo") {
      methodValue = {
        type: "EWALLET",
        bank_code: "ZALOPAY",
      };
    } else {
      methodValue = {
        type: "EWALLET",
        bank_code: "VNPAY",
      };
    }

    let data = {
      cart: formData,
      method: methodValue,
    };

    console.log(data);

    const res = await userRenewGroup(
      grpId,
      user?.accessToken,
      dispatch,
      data,
      axiosJWT
    );

    console.log(res);

    if (res?.statusCode === 200) {
      window.open(order.order.order_url);

      async function getGroup() {
        await getGroupByUserId(user?.accessToken, dispatch, axiosJWT);
      }

      function stopClock() {
        clearTimeout(timeoutID);
        getGroup();
      }

      const timeoutID = setTimeout(stopClock, 1 * 60 * 1000);

      // socket.on("zpCallback", (data) => {
      //   if (data) {
      //     console.log("vy", data);
      //     getGroup();
      //     clearTimeout(timeoutID);
      //   }
      // });

      navigate("/group");
    }
  };

  const socket = SockectIO();
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (duration >= 12) {
      setMoney(
        (item.price + (member - 2) * duration * (item.coefficient ?? 0)) * 0.7
      );
    } else {
      setMoney(item.price + (member - 2) * duration * (item.coefficient ?? 0));
    }
  }, [duration, item.coefficient, item.price, member]);

  return (
    <>
      <Card
        sx={{
          width: { xs: "70%", sm: "40%", md: "30%", lg: "25%" },
          margin: "10px",
          bgcolor: Colors.background,
          borderRadius: "10px",
          boxShadow: "2px 2px 5px #8c8c8c",
        }}
      >
        <CardContent>
          <Typography
            variant="button"
            display="block"
            gutterBottom
            align="center"
            fontSize={18}
            color={Colors.textPrimary}
          >
            {item.name}
          </Typography>
          <Box sx={{ height: "150px" }}>
            {item.description.split("\n").map((el, index) => (
              <Typography
                variant="body2"
                key={index}
                gutterBottom
                align="justify"
              >
                + {el}
              </Typography>
            ))}
          </Box>
          <Divider flexItem sx={{ paddingY: "10px" }} />
          <Stack>
            <Typography variant="overline" display="block" gutterBottom>
              Số người
            </Typography>
            {item.name === "Family Package" ? (
              <Box className="item">
                {/* <CustomComponents.CssTextField size="small" value={member} /> */}
                <Typography variant="subtitle1" fontSize={18} gutterBottom>
                  {member}
                </Typography>
              </Box>
            ) : (
              <Box className="item">
                <CustomComponents.PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  min={item.noOfMember}
                  max={15}
                  value={member}
                  onChange={(event) => setMember(event.target.value)}
                />
                <Input
                  size="small"
                  sx={{ width: "40px", paddingLeft: "12px" }}
                  value={member}
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                />
              </Box>
            )}
          </Stack>
          <Divider flexItem sx={{ paddingY: "10px" }} />
          <Stack>
            <Typography variant="overline" display="block" gutterBottom>
              Thời gian
            </Typography>
            {item.name === "Experience Package" ||
            item.name === "Annual Package" ||
            item.name === "Family Package" ? (
              <Box className="item">
                <Typography variant="subtitle1" fontSize={18} gutterBottom>
                  {duration}
                </Typography>
              </Box>
            ) : (
              <Box className="item">
                <CustomComponents.PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  min={item.duration}
                  max={10}
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                />
                <Input
                  size="small"
                  sx={{ width: "40px", paddingLeft: "12px" }}
                  value={duration}
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                />
              </Box>
            )}
          </Stack>
          <Divider flexItem sx={{ paddingY: "10px" }} />
          <Typography
            variant="subtitle2"
            gutterBottom
            className="item"
            fontSize={25}
            paddingTop={2}
          >
            {Math.round(money)} VNĐ
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <CustomComponents.Button1
            fullWidth
            onClick={handleOpen}
            sx={{ marginX: "7px" }}
          >
            Mua gói
          </CustomComponents.Button1>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack>
            <FormControl>
              <FormLabel id="radio-buttons-method-total">
                Chọn phương thức thanh toán
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={valueMethod}
                name="radio-buttons-group"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="zalo"
                  control={<Radio />}
                  label="Zalo"
                />
                <FormControlLabel
                  value="vnpay"
                  control={<Radio />}
                  label="Vnpay"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Khác"
                />
              </RadioGroup>
            </FormControl>
            <CustomComponents.Button1
              onClick={(event) => handleCheckoutPackageRenew(event, item)}
            >
              Thanh toán
            </CustomComponents.Button1>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default DetailItemRenew;
