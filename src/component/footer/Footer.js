import React from "react";
import { Box, Grid, Stack, Typography, Button } from "@mui/material";

import LogoFB from "../../assets/img/facebook.png";
import LogoIns from "../../assets/img/instagram.png";
import { MoMoIcon, ATMIcon } from "../../assets/icons";
import { Colors } from "../../config/Colors";

function Footer() {
  
  return (
    <Box
      position={"static"}
      left={0}
      bottom={0}
      bgcolor={Colors.background}
      sx={{ width: "100%" }}
      color={Colors.textPrimary}
      boxShadow={"0px -4px 3px rgba(50, 50, 50, 0.25)"}
      // zIndex={1}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        paddingX={5}
        paddingY={2}
      >
        <Stack spacing={2}>
          <Typography> Về chúng tôi </Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography> Phương thức thanh toán </Typography>
          <Stack direction="row" spacing={2} pl={2}>
            <MoMoIcon />
            <ATMIcon />
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Typography> Liên hệ với chúng tôi</Typography>
          <Stack direction="row" spacing={2}>
            <Button>
              <img src={LogoFB} alt="Logo" width={25} />
            </Button>
            <Button>
              <img src={LogoIns} alt="Logo" width={25} />
            </Button>
          </Stack>
          <Typography> Tải ứng dụng trên điện thoại </Typography>
        </Stack>
      </Grid>
    </Box>
  );
}

export default Footer;
