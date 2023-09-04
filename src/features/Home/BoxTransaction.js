import React from "react";

import { Stack, Typography, Box, IconButton } from "@mui/material";

import { Colors } from "../../config/Colors";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import GroupIcon from "@mui/icons-material/Group";
import { BsFillChatDotsFill } from "react-icons/bs";
import "../../assets/css/Home.scss";
import * as FormatNumber from "../../component/custom/FormatDateNumber";
import { useSelector } from "react-redux";

function BoxTransaction({ homeChat, homeTrans }) {
  //const homeChat = useSelector((state) => state?.home.homeChat);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Stack
        spacing={1}
        className="home-box-2-right"
        sx={{
          width: { xs: "calc(100% - 40px)px", md: "50%" },
          marginLeft: "15px",
          marginRight: "10px",
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          Giao dịch gần đây
        </Typography>
        {homeTrans.length > 0 ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 550,
                  color: Colors.textPrimary,
                }}
              >
                Mã giao dịch:
              </Typography>
              <Typography
                variant="overline"
                display="block"
                sx={{ paddingLeft: "10px", fontSize: "18px" }}
              >
                {homeTrans[0]?._id}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 550,
                  color: Colors.textPrimary,
                }}
              >
                Tổng tiền:
              </Typography>
              <Typography
                variant="overline"
                display="block"
                sx={{ paddingLeft: "10px", fontSize: "18px" }}
              >
                {FormatNumber.formatCurrency(homeTrans[0]?.amount)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <QueryBuilderIcon sx={{ color: Colors.textPrimary }} />
              <Typography
                variant="overline"
                display="block"
                sx={{ paddingLeft: "10px", fontSize: "18px" }}
              >
                {FormatNumber.formatDate(homeTrans[0]?.createdAt)}
              </Typography>
            </Box>
          </>
        ) : null}
      </Stack>
      <Stack
        spacing={2}
        className="home-box-2-right"
        sx={{
          width: { xs: "calc(100% - 40px)px", md: "50%" },
          marginLeft: "10px",
          marginRight: "15px",
        }}
      >
        <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
          Nhóm chat của tôi
        </Typography>
        {homeChat.length > 0 ? (
          homeChat.map((chat, idx) =>
            chat ? (
              <Box className="d-flex" key={idx}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <GroupIcon />
                  <Typography sx={{ paddingX: "10px", fontSize: "18px" }}>
                    {chat?.name}
                  </Typography>
                </Box>
                <IconButton
                  sx={{ fontSize: "30px", color: Colors.textPrimary }}
                >
                  <BsFillChatDotsFill />
                </IconButton>
              </Box>
            ) : null
          )
        ) : (
          <Box>
            <Typography>Bạn hiện chưa có nhóm chat nào!</Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default BoxTransaction;
