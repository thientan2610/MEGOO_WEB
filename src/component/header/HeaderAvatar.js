import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../http/createInstance.js";

import { Box, Button, Avatar } from "@mui/material";

import * as CustomComponent from "../custom/CustomComponents.js";
import MenuItemRow from "./MenuItemRow.js";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice.js";
import { logoutUser } from "../../redux/authRequest.js";
import { Colors } from "../../config/Colors.js";

function HeaderAvatar({ data, user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const userInfo = useSelector((state) => state?.user?.userInfo.user);

  const image = user ? (userInfo.avatar ?? "") : "";
  const [isShown, setIsShown] = useState(false);

  const handleClickProfile = () => {
    navigate("/profile");
  };

  const handleClickLogout = async () => {
    dispatch(loginSuccess(null));
    navigate("/login");
    // console.log(user?.accessToken);
    // await logoutUser(user?.accessToken, dispatch, navigate, axiosJWT);
  };

  const handleClickLogin = () => {
    navigate("/login");
  };
  return (
    <>
      {data.map((data, index) => (
        <MenuItemRow item={data} key={index} user={user} />
      ))}
      <Box sx={{ position: "relative" }}>
        <Button
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <Avatar src={image} sizes="35" />
        </Button>
        {isShown && (
          <Box
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            sx={{
              position: "absolute",
              right: 0,
              top: "50px",
              display: "flex",
              flexDirection: "column",
              width: "200px",
              boxShadow: "2px 2px 5px #8c8c8c",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: Colors.background
            }}
          >
            {user ? (
              <>
                <CustomComponent.ButtonPopperAvatar
                  onClick={handleClickProfile}
                >
                  Thông tin tài khoản
                </CustomComponent.ButtonPopperAvatar>
                <CustomComponent.ButtonPopperAvatar onClick={handleClickLogout}>
                  Đăng xuất
                </CustomComponent.ButtonPopperAvatar>
              </>
            ) : (
              <CustomComponent.ButtonPopperAvatar onClick={handleClickLogin}>
                Đăng nhập/Đăng ký
              </CustomComponent.ButtonPopperAvatar>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

export default HeaderAvatar;
