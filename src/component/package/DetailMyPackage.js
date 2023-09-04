import React from "react";
import { Box, Typography } from "@mui/material";

import "../../assets/css/Content.scss";
import { Colors } from "../../config/Colors";

function DetailMyPackage({ title, detail }) {
  return (
    <Box className="form-my-package">
      <Typography
        variant="subtitle2"
        fontSize={16}
        paddingRight={"10px"}
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        fontSize={16}
        gutterBottom
        color={Colors.text}
      >
        {detail}
      </Typography>
    </Box>
  );
}

export default DetailMyPackage;
