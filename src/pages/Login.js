import React from "react";
import { Box, CircularProgress, Stack } from "@mui/material";

import Welcome from "../features/Login/Welcome";
import FormSignIn from "../features/Login/FormSignIn";
import { Colors } from "../config/Colors";
import { useSelector } from "react-redux";

function Login() {
  const isProgress = useSelector((state) => state?.message.isProgress);
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      bgcolor={Colors.bgGray}
      sx={{ height: "100vh", width: "100%", position: "relative" }}
    >
      <Stack
        direction="row"
        className="login-page"
        sx={{ width: { xs: "80%", sm: "60%" }, opacity: isProgress ? 0.35 : 1 }}
      >
        <Welcome />
        <FormSignIn />
      </Stack>
      {isProgress && (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Stack>
  );
}

export default Login;
