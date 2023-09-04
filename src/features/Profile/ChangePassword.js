import React, { useState } from "react";
import { Stack, Box, Typography, LinearProgress } from "@mui/material";

import PasswordComponent from "../../component/password/Password";

import * as Custom from "../../component/custom/CustomComponents.js";
import * as ValidatePassword from "../../component/password/ValidatePassword.js";

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

function ChangePassword() {
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [rePasswordNew, setRePasswordNew] = useState("");
  const [validatePass, setValidatePass] = useState({
    label: "",
    color: "",
    percentage: 0,
  });

  const onChangeValue = (newValue, id) => {
    if (id === 1) {
      setPasswordCurrent(newValue);
    } else if (id === 2) {
      setPasswordNew(newValue);
      let num = ValidatePassword.strengthIndicator(newValue);
      setValidatePass(ValidatePassword.strengthColor(num));
    } else {
      setRePasswordNew(newValue);
    }
  };

  const handleChangePassword = () => {
    //
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Stack
        spacing={2.5}
        className="box-change-password"
        sx={{ width: { xs: "90%", sm: "70%", lg: "50%" } }}
      >
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
        >
          <Typography className="title">Thay đổi mật khẩu</Typography>
        </Box>
        <PasswordComponent
          title="Mật khẩu hiện tại"
          id={1}
          onChangeValue={onChangeValue}
        />
        <Box sx={{ width: "100%" }}>
          <PasswordComponent
            title="Mật khẩu mới"
            id={2}
            onChangeValue={onChangeValue}
          />
          {passwordNew.length > 0 && (
            <LinearProgressWithLabel value={validatePass} />
          )}
        </Box>
        <PasswordComponent
          title="Nhập lại mật khẩu mới"
          id={3}
          onChangeValue={onChangeValue}
        />
        <Box>
          <Custom.Button1 onClick={handleChangePassword}>
            Lưu thay đổi
          </Custom.Button1>
        </Box>
      </Stack>
    </Box>
  );
}

export default ChangePassword;
