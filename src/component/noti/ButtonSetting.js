import React, { Fragment } from "react";
import { Box } from "@mui/material";

import "../../assets/css/Content.scss";
import * as Custom from "../custom/CustomComponents.js";
import { Colors } from "../../config/Colors.js";
import Noti from "./Noti.js";

function ButtonSetting({ title, describe, isChecked, children }) {
  return (
    <Fragment>
      {/* <Box flex={1} className="box-noti-icon">
        {children}
      </Box> */}
      <Box flex={4} className="box-noti">
        {children}
        <Noti title={title} describe={describe} />
      </Box>
      <Box flex={2}>
        <Custom.IOSSwitch checked={isChecked} />
      </Box>
    </Fragment>
  );
}

export default ButtonSetting;
