import React from "react";

import { Box } from "@mui/material";
import ImgMegoo from "../../assets/img/MegooWhite.png";

function LeftContent() {
  return (
    <Box
      flex={2}
      sx={{
        display: { xs: "none", sm: "none", md: "flex" },
        borderRadius: "10px 0px 0px 10px",
      }}
      justifyContent="center"
      alignItems="center"
      bgcolor={"#ffbf66"}
    >
      <img src={ImgMegoo} alt="Logo" width={"60%"} />
    </Box>
  );
}

export default LeftContent;
