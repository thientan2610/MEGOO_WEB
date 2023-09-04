import React from "react";

import { Box, Typography } from "@mui/material";

import "../../assets/css/Group.scss";

function NotificationEmpty({ msg }) {
  return (
    <Box className="notification-empty">
        <Typography className="text">{msg}</Typography>
    </Box>
  );
}

export default NotificationEmpty;
