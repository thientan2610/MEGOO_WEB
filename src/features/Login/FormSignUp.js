import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Stack,
  Divider,
  Container,
  Button,
  LinearProgress,
} from "@mui/material";

import "../../assets/css/FormSignUp.scss";
import LogoGG from "../../assets/img/google.png";
import LogoFB from "../../assets/img/facebook.png";
import * as CustomButton from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker.js";

import api from "../../http/http-common";
import { useDispatch } from "react-redux";
import { loginFailed, loginStart } from "../../redux/authSlice";
import * as ValidatePassword from "../../component/password/ValidatePassword";
import { API_HOST,WEB_HOST } from "../../http/http-common";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "60%", md: "40%" },
  height: "calc(100vh - 100px)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

function LinearProgressWithLabel({ value }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          color={value.color}
          value={value.percentage}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          value.percentage
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function FormSignUp() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [date, setDate] = React.useState("");

  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [rePasswordError, setRePasswordError] = React.useState(false);

  const [usernameText, setUsernameText] = React.useState("");
  const [nameText, setNameText] = React.useState("");
  const [emailText, setEmailText] = React.useState("");
  const [phoneText, setPhoneText] = React.useState("");
  const [passwordText, setPasswordText] = React.useState("");
  const [rePasswordText, setRePasswordText] = React.useState("");
  const [validatePass, setValidatePass] = useState({
    label: "",
    color: "",
    percentage: 0,
  });
  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue);
  };

  const handlePassword = (e) => {
    let x = e.target.value;
    setPassword(x);
    let num = ValidatePassword.strengthIndicator(x);
    setValidatePass(ValidatePassword.strengthColor(num));
  };

  const handleValidation = () => {
    var validUsername =
      "^(?=.{8,255}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";

    var validEmail = "/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/";

    var validPassword =
      "^(?=[.\\S]*[A-Z][.\\S]*)(?=[.\\S]*[0-9][.\\S]*)(?=[.\\S]*[a-z][.\\S]*)[.\\S]{8,255}$";

    var validPhone = "/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/";

    if (username === "") {
      setUsernameError(true);
      setUsernameText("Vui lòng điền username!");
    } else if (!username.match(validUsername)) {
      setUsernameError(true);
      setUsernameText("Username không hợp lệ!");
    } else {
      setUsernameError(false);
    }

    if (name === "") {
      setNameError(true);
      setNameText("Vui lòng điền tên người dùng!");
    } else {
      setNameError(false);
    }

    if (email === "") {
      setEmailError(true);
      setEmailText("Vui lòng điền email!");
    } else if (!email.match(validEmail)) {
      setEmailError(true);
      setEmailText("Email không hợp lệ!");
    } else {
      setEmailError(false);
    }

    if (phone === "") {
      setPhoneError(true);
      setPhoneText("Vui lòng điền số điện thoại!");
    } else if (!phone.match(validPhone)) {
      setPhoneError(true);
      setPhoneText("Số điện thoại không hợp lệ!");
    } else {
      setPhoneError(false);
    }

    if (password === "") {
      setPasswordError(true);
      setPasswordText("Vui lòng điền mật khẩu!");
    } else if (!password.match(validPassword)) {
      setPasswordError(true);
      setPasswordText("Mật khẩu không hợp lệ!");
      setPassword("");
    } else {
      setPasswordError(true);
    }

    if (rePassword === "") {
      setRePasswordError(true);
      setRePasswordText("Vui lòng điền lại mật khẩu!");
    } else if (!rePassword.match(password)) {
      setRePasswordError(true);
      setPasswordError(true);
      setRePasswordText("Mật khẩu nhập lại không chính xác!");
      setPassword("");
      setRePassword("");
    } else {
      setRePasswordError(false);
    }
  };

  const handleRegister = () => {
    // handleValidation();

    let formData = {
      username: username,
      password: password,
      name: name,
      dob: date,
      phone: phone,
      email: email,
    };

    submitRegister(formData);
  };

  const submitRegister = async (formData) => {
    try {
      const response = await api.post("/auth/register", formData);
      console.log(response);
    } catch (error) {
      console.log(error);
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

  return (
    <Container disableGutters maxWidth={false}>
      <CustomButton.Button1 variant="contained" fullWidth onClick={handleOpen}>
        Tạo tài khoản
      </CustomButton.Button1>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Đăng ký
          </Typography>
          <Stack
            id="modalFormSignup"
            mt={2}
            p={2}
            spacing={2}
            className="modalModalSignup"
          >
            <TextField
              required
              id="outlined-required-username"
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
              helperText={usernameText}
            />
            <TextField
              required
              id="outlined-required-name"
              label="name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              helperText={nameText}
            />
            <TextField
              required
              id="outlined-required-email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailText}
            />
            <TextField
              required
              id="outlined-required-phone"
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={phoneError}
              helperText={phoneText}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Nhập mật khẩu"
              type="password"
              autoComplete="current-password"
              fullWidth
              value={password}
              onChange={(e) => handlePassword(e)}
              error={passwordError}
              helperText={passwordText}
            />
            {password.length > 0 && (
              <Box>
                <LinearProgressWithLabel value={validatePass} />
              </Box>
            )}
            <TextField
              required
              id="outlined-the-password-input"
              label="Nhập lại mật khẩu"
              type="password"
              autoComplete="current-password"
              fullWidth
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              error={rePasswordError}
              helperText={rePasswordText}
            />
            <DateTimePicker
              valueDay={null}
              handleDateTimePicker={handleDateTimePicker}
              sizeDateTime={"small"}
            />
            <CustomButton.Button1
              variant="contained"
              fullWidth
              onClick={handleRegister}
            >
              Đăng ký
            </CustomButton.Button1>
            <Divider flexItem> Hoặc </Divider>
            <Button variant="outlined" fullWidth onClick={googleLogin}>
              <img src={LogoGG} alt="Logo" width={25} />
              <Typography pl={2}> Đăng ký bằng GG </Typography>
            </Button>
            <Button variant="outlined" fullWidth>
              <img src={LogoFB} alt="Logo" width={25} />
              <Typography pl={2}> Đăng ký bằng FB </Typography>
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}
