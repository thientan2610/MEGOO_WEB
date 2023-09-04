import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import * as Custom from "../custom/CustomComponents.js";

function Password({ title, id, onChangeValue }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl variant="outlined" sx={{ width: "100%"}}>
      <InputLabel shrink htmlFor="passwork-input">
        {title}
      </InputLabel>
      <Custom.PasswordInput
        placeholder={title}
        fullWidth
        id={`adornment-password-${id}`}
        type={showPassword ? "text" : "password"}
        onChange={(e) => onChangeValue(e.target.value, id)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              //aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              //edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default Password;
