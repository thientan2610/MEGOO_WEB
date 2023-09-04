import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  TextField,
  Link,
  Divider,
  Typography,
  Button,
} from "@mui/material";

import { loginUser } from "../../redux/authRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginFailed, loginStart, loginSuccess } from "../../redux/authSlice";

import { createAxios } from "../../http/createInstance.js";

import FormSignUp from "./FormSignUp";
import LogoGG from "../../assets/img/google.png";
import LogoFB from "../../assets/img/facebook.png";
import * as CustomButton from "../../component/custom/CustomComponents.js";
import { Colors } from "../../config/Colors";
import "../../assets/css/FormSignIn.scss";
import { updateProgress } from "../../redux/messageSlice";
import { API_HOST,WEB_HOST } from "../../http/http-common";

function FormSignIn() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const loginMsg = useSelector((state) => state?.auth.login?.msg);
  const user = useSelector((state) => state?.auth.login?.currentUser);
  const tokenJoinGr = useSelector((state) => state?.auth.tokenJoinGr);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleLogin = async (e) => {
    e.preventDefault();
    var checkEmail = false;
    var checkPass = false;

    if (email === "") {
      setEmailError(true);
      setEmailHelperText("Vui lòng điền email!");
    } else {
      setEmailError(false);
      checkEmail = true;
      setEmailHelperText("");
    }

    if (password === "") {
      setPasswordError(true);
      setPasswordHelperText("Vui lòng điền mật khẩu!");
    } else {
      setPasswordError(false);
      checkPass = true;
      setPasswordHelperText("");
      setPassword("");
    }

    let formData = {
      username: email,
      password: password,
    };

    if (checkEmail === true && checkPass === true) {
      dispatch(updateProgress(true));
      const res = await loginUser(formData, dispatch, navigate, tokenJoinGr, axiosJWT);
      if (res != null) {
        dispatch(updateProgress(false));
      }
    }
  };

  const googleLogin = async () => {
    try {
      dispatch(loginStart());
      window.open(
        `${API_HOST}/auth/oauth2/google/${(WEB_HOST+"/google").replaceAll(
          "/",
          "@"
        )}`,
        "_self"
      );
    } catch (error) {
      dispatch(loginFailed(error.response.data));
    }
  };

  useEffect(() => {
    if (loginMsg?.statusCode === 401) {
      setPasswordError(true);
      setPasswordHelperText(loginMsg?.message);
    } else if (loginMsg?.statusCode === 404) {
      setEmailError(true);
      setEmailHelperText(loginMsg?.message);
    }
  }, [loginMsg])

  return (
    <Box
      flex={2}
      sx={{ display: { xs: "flex" }, borderRadius: "0px 10px 10px 0px", }}
      bgcolor={Colors.background}
      className="page-sigin"
    >
      <Stack
        id="form-id-signin"
        spacing={2}
        sx={{ width: { xs: "80%", sm: "90%" } }}
        p={2}
        mt={2}
        mb={2}
        alignItems="center"
        className="form-class-signin"
      >
        <TextField
          required
          id="outlined-required-username"
          label="Username"
          variant="outlined"
          fullWidth
          value={email}
          helperText={emailHelperText}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          fullWidth
          value={password}
          helperText={passwordHelperText}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
        <CustomButton.Button1
          variant="contained"
          fullWidth
          onClick={handleLogin}
        >
          Đăng nhập
        </CustomButton.Button1>
        <Link href="#" underline="hover">
          {"Quên mật khẩu?"}
        </Link>
        <Divider flexItem> Hoặc </Divider>
        <Button variant="outlined" fullWidth onClick={googleLogin}>
          <img src={LogoGG} alt="Logo" width={25} />
          <Typography pl={2}> Đăng nhập bằng GG </Typography>
        </Button>
        <Button variant="outlined" fullWidth>
          <img src={LogoFB} alt="Logo" width={25} />
          <Typography pl={2}> Đăng nhập bằng FB </Typography>
        </Button>
        <FormSignUp />
      </Stack>
    </Box>
  );
}

export default FormSignIn;
