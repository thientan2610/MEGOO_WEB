import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";

import "../../assets/css/Chat.scss";
import { Colors } from "../../config/Colors";

function Message({ listMessage, userId }) {
  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      {listMessage.map((mess, idx) =>
        mess.text ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent:
                userId === mess.user._id ? "flex-end" : "flex-start",
              alignItems: "flex-end",
            }}
            key={idx}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "row",
                justifyContent:
                  userId === mess.user._id ? "flex-end" : "flex-start",
                alignItems: "flex-end",
              }}
            >
              {userId !== mess.user._id ? (
                <Avatar src={mess.user.avatar} sx={{ width: 24, height: 24 }} />
              ) : null}
              {mess.type === "image" ? (
                <img src={mess.text} alt="imageChat" width={"100%"} />
              ) : (
                <Typography
                  className="message"
                  sx={{
                    backgroundColor:
                      userId !== mess.user._id ? Colors.gray : Colors.chat,
                  }}
                >
                  {mess.text}
                </Typography>
              )}
            </Box>
          </Box>
        ) : null
      )}
    </Stack>
  );
}

export default Message;
