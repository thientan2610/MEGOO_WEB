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
  Input,
} from "@mui/material";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

import { useNavigate } from "react-router-dom";
import { createAxios } from "../../http/createInstance.js";

import jwtDecode from "jwt-decode";

import { Colors } from "../../config/Colors";
import * as CustomComponents from "../custom/CustomComponents.js";
import "../../assets/css/Content.scss";
import { updateUserCart } from "../../redux/packageRequest";
import { loginSuccess } from "../../redux/authSlice";
import { updateNotiPackage } from "../../redux/packageSlice.js";

function DetailItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  const userCart = useSelector((state) => state?.package?.cart);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [member, setMember] = useState(item.noOfMember);
  // const [arrowLeftMem, setArrowLeftMem] = useState(true);
  // const [arrowRightMem, setArrowRightMem] = useState(false);

  const [duration, setDuration] = useState(item.duration);
  // const [arrowLeftDura, setArrowLeftDura] = useState(true);
  // const [arrowRightDura, setArrowRightDura] = useState(false);

  const [money, setMoney] = useState(item.price);

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

  // const handleArrowLeftMem = () => {
  //   setMember(member - 1);
  // };
  // const handleArrowRightMem = () => {
  //   setMember(member + 1);
  // };

  // const handleArrowLeftDura = () => {
  //   setDuration(duration - 1);
  // };
  // const handleArrowRightDura = () => {
  //   setDuration(duration + 1);
  // };

  const handleButtonAdd = async (event, item) => {
    let day = new Date();
    if (user !== null) {
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < day.getTime() / 1000) {
        dispatch(loginSuccess(null));
      }
    }
    if (user) {
      let shoppingCart = [];
      for (let ele of userCart) {
        let data = {
          package: ele._id,
          quantity: ele.quantity,
          noOfMember: ele.noOfMember,
          duration: ele.duration,
        };
        shoppingCart.push(data);
      }

      let formData = {
        package: item._id,
        quantity: 1,
        noOfMember: member,
        duration: duration,
      };

      for (let ele of shoppingCart) {
        if (
          ele.package === item._id &&
          ele.noOfMember === member &&
          ele.duration === duration
        ) {
          formData.quantity = ele.quantity + 1;
        }
      }

      shoppingCart = [
        ...shoppingCart.filter(
          (data) =>
            data.package !== item._id ||
            data.noOfMember !== member ||
            data.duration !== duration
        ),
        formData,
      ];

      let formCart = {
        cart: shoppingCart,
      };

      const res = await updateUserCart(
        user?.data.userInfo._id,
        formCart,
        user?.accessToken,
        dispatch,
        axiosJWT
      );

      let formNoti = {};

      if (res?.statusCode === 200) {
        formNoti = {
          statusNoti: 1,
          msgNoti: "Cập nhật giỏ hàng thành công",
        };
      } else {
        formNoti = {
          statusNoti: 2,
          msgNoti: "Cập nhật giỏ hàng thất bại!",
        };
      }
      dispatch(updateNotiPackage(formNoti));

      formNoti = {
        statusNoti: 0,
        msgNoti: "",
      };
      setTimeout(() => {
        dispatch(updateNotiPackage(formNoti));
      }, 2000);
    } else {
      navigate("/login");
    }
  };

  const handleButtonBuy = async (event, item) => {
    let day = new Date();
    if (user !== null) {
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < day.getTime() / 1000) {
        dispatch(loginSuccess(null));
      }
    }
    if (user) {
      let shoppingCart = [];
      for (let ele of userCart) {
        let data = {
          package: ele._id,
          quantity: ele.quantity,
          noOfMember: ele.noOfMember,
          duration: ele.duration,
        };
        shoppingCart.push(data);
      }

      let formData = {
        package: item._id,
        quantity: 1,
        noOfMember: member,
        duration: duration,
      };

      for (let ele of shoppingCart) {
        if (
          ele.package === item._id &&
          ele.noOfMember === member &&
          ele.duration === duration
        ) {
          formData.quantity = ele.quantity + 1;
        }
      }

      shoppingCart = [
        ...shoppingCart.filter(
          (data) =>
            data.package !== item._id ||
            data.noOfMember !== member ||
            data.duration !== duration
        ),
        formData,
      ];

      let formCart = {
        cart: shoppingCart,
      };

      const res = await updateUserCart(
        user?.data.userInfo._id,
        formCart,
        user?.accessToken,
        dispatch,
        axiosJWT
      );

      let formNoti = {};

      if (res?.statusCode === 200) {
        navigate("/shopping-cart");
      } else {
        formNoti = {
          statusNoti: 2,
          msgNoti: "Cập nhật giỏ hàng thất bại!",
        };
      }
      dispatch(updateNotiPackage(formNoti));

      formNoti = {
        statusNoti: 0,
        msgNoti: "",
      };
      setTimeout(() => {
        dispatch(updateNotiPackage(formNoti));
      }, 2000);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    // if (member <= item.noOfMember) {
    //   setArrowLeftMem(true);
    // } else {
    //   setArrowLeftMem(false);
    // }

    // if (member > 100) {
    //   setArrowRightMem(true);
    // } else {
    //   setArrowRightMem(false);
    // }

    // if (duration <= item.duration) {
    //   setArrowLeftDura(true);
    // } else {
    //   setArrowLeftDura(false);
    // }

    // if (duration > 100) {
    //   setArrowRightDura(true);
    // } else {
    //   setArrowRightDura(false);
    // }

    if (duration >= 12) {
      setMoney(
        (item.price + (member - 2) * duration * (item.coefficient ?? 0)) * 0.7
      );
    } else {
      setMoney(item.price + (member - 2) * duration * (item.coefficient ?? 0));
    }
  }, [duration, item.coefficient, item.price, member]);

  return (
    <Card
      sx={{
        width: { xs: "70%", sm: "40%", md: "30%", lg: "25%" },
        margin: "10px",
        bgcolor: Colors.background,
        borderRadius: "10px",
        boxShadow: "2px 2px 5px #8c8c8c",
      }}
      className="detail-item-pkg"
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
            Số người (người)
          </Typography>
          {item.name === "Family Package" ? (
            <Box className="item">
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
                sx={{ width: '40px', paddingLeft: '12px' }}
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
            Thời gian (tháng)
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
              {/* <IconButton
                disabled={arrowLeftDura}
                onClick={handleArrowLeftDura}
              >
                <CiSquareMinus
                  color={arrowLeftDura ? null : Colors.textPrimary}
                  size={30}
                />
              </IconButton>
              <Typography variant="subtitle1" fontSize={18}>
                {duration}
              </Typography>
              <IconButton
                disabled={arrowRightDura}
                onClick={handleArrowRightDura}
              >
                <CiSquarePlus
                  color={arrowRightDura ? null : Colors.textPrimary}
                  size={30}
                />
              </IconButton> */}
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
                sx={{ width: '40px', paddingLeft: '12px'}}
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
        <CustomComponents.Button2
          onClick={(event) => handleButtonAdd(event, item)}
        >
          Thêm vào giỏ hàng
        </CustomComponents.Button2>
        <CustomComponents.Button1
          onClick={(event) => handleButtonBuy(event, item)}
        >
          Mua gói
        </CustomComponents.Button1>
      </CardActions>
    </Card>
  );
}

export default DetailItem;
