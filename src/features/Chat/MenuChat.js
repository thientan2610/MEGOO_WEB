import React from "react";

import { Avatar, Box, InputBase, Stack, Typography } from "@mui/material";

import { Colors } from "../../config/Colors.js";
import "../../assets/css/Chat.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";

function MenuChat() {
  
  return (
    <Stack spacing={2}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Chat
      </Typography>
      <Box sx={{ bgcolor: Colors.search, borderRadius: "15px" }}>
        <InputBase
          placeholder="Tìm kiếm "
          fullWidth
          sx={{ paddingLeft: "10px" }}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <CustomComponent.GroupChat fullWidth>
          <Box className="avatar-menu-chat">
            <Avatar src="" />
            <Typography
              variant="body1"
              sx={{ paddingLeft: "5px", color: Colors.text }}
            >
              Group 1
            </Typography>
          </Box>
        </CustomComponent.GroupChat>
      </Box>
    </Stack>
  );
}

export default MenuChat;
