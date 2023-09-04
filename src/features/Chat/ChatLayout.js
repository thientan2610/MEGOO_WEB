import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Stack,
  Typography,
  Badge,
  Divider,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { RiSendPlane2Fill } from "react-icons/ri";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import InfoIcon from "@mui/icons-material/Info";

import { Colors } from "../../config/Colors.js";
import "../../assets/css/Chat.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";

import { updateChannelID } from "../../redux/userSlice.js";
import { createAxios } from "../../http/createInstance";

// import DogImg from "../../assets/img/dog.jpg";
import ErrorImg from "../../assets/img/error_photo.png";

import * as SB from "../../component/Chat/SendBirdGroupChat.js";
import Message from "./Message.js";
import { uploadFileImage } from "../../redux/userRequest.js";
import { loginSuccess } from "../../redux/authSlice.js";
import { updateProgress } from "../../redux/messageSlice.js";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function ChatLayout({ item, channelFisrt, messageFirst }) {
  //connectionStatus
  const dispatch = useDispatch();
  const inputRef = useRef();

  const userInfo = useSelector((state) => state?.user?.userInfo.user);
  const channelID = useSelector((state) => state?.user?.channelID);
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState(messageFirst);
  const [channelUser, setChannelUser] = useState(channelFisrt);
  const [open, setOpen] = useState(true);

  const handleChoseChannel = async (event, id) => {
    let c = await SB.getUserChannel(id);
    setChannelUser(c);

    let m = await SB.receiveMessage(c);
    setListMessage(m.reverse());
    //setListMessage(m);
    dispatch(updateChannelID(id));
  };

  const handleSendMessage = async () => {
    let list = [];
    await SB.sendMessage(channelUser, message, "text");

    list = await SB.receiveMessage(channelUser);

    setListMessage(list.reverse());
    //setListMessage(list);
    setMessage("");
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleSendFile = async (event) => {
    let list = [];
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    let formData = {
      file: fileObj,
    };
    dispatch(updateProgress(true));
    const res = await uploadFileImage(formData, user?.accessToken, axiosJWT);

    if (res?.statusCode === 200) {
      await SB.sendMessage(channelUser, res?.data, "image");
      list = await SB.receiveMessage(channelUser);
      setListMessage(list.reverse());
      dispatch(updateProgress(false));
    } else {
      dispatch(updateProgress(false));
    }
  };

  useEffect(() => {
    const connectToSB = async (id) => {
      await SB.connectSendBird(id);
    };

    connectToSB(userInfo?._id).catch(console.error);

    setChannelUser(channelFisrt);
    setListMessage(messageFirst);
  }, [channelFisrt, messageFirst, userInfo]);

  return (
    <Box className="chat-layout">
      <Box className="box-menu-chat">
        <Stack spacing={2}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Chat
          </Typography>
          <Box sx={{ bgcolor: Colors.search, borderRadius: "20px" }}>
            <InputBase
              placeholder="Tìm kiếm "
              fullWidth
              sx={{ paddingLeft: "10px", height: "40px" }}
            />
          </Box>
          <Box id="scrollBar-list" className="list-channels">
            {item.map((channel, idx) =>
              channel ? (
                <Box key={channel._id} sx={{ paddingY: "3px" }}>
                  <CustomComponent.GroupChat
                    sx={{
                      backgroundColor:
                        channel._id === channelID ? "#ffebcc" : null,
                    }}
                    onClick={(e) => handleChoseChannel(e, channel._id)}
                  >
                    <CustomComponent.ImageSrcGC>
                      <Avatar
                        src={channel.avatar}
                        sx={{ width: 60, height: 60 }}
                      />

                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                      >
                        <Typography
                          sx={{ paddingLeft: "8px", fontSize: "20px" }}
                        >
                          {channel.name}
                        </Typography>
                        <Typography
                          sx={{ paddingLeft: "8px", color: "#737373" }}
                        >
                          
                        </Typography>
                      </Stack>
                    </CustomComponent.ImageSrcGC>
                  </CustomComponent.GroupChat>
                </Box>
              ) : null
            )}
          </Box>
        </Stack>
      </Box>

      <Box flex={1}>
        <Stack spacing={2} className="content-chat">
          <Box className="avatar-content-chat">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Avatar
                src={channelUser?.coverUrl}
                sx={{ width: 50, height: 50 }}
              />
              <Typography
                variant="subtitle1"
                sx={{ paddingLeft: "10px", fontWeight: 550, fontSize: 16 }}
              >
                {channelUser?.name}
              </Typography>
            </Box>
            <IconButton onClick={() => setOpen(!open)}>
              <InfoIcon
                sx={{ width: 30, height: 30, color: Colors.textPrimary }}
              />
            </IconButton>
          </Box>
          <Box
            sx={{ paddingX: "20px" }}
            id="scrollBar-message"
            className="list-message"
          >
            {/* {listMessage.map((mess) =>
              mess ? (
                <Message mess={mess} key={mess._id} userId={userInfo?._id} />
              ) : null
            )} */}
            {listMessage.length > 0 ? (
              <Message listMessage={listMessage} userId={userInfo?._id} />
            ) : null}
            <div id="mess-last"></div>
          </Box>
          <div className="input-chat">
            <IconButton onClick={handleClick}>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleSendFile}
              />
              <AttachFileIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                bgcolor: Colors.search,
                borderRadius: "30px",
              }}
            >
              <InputBase
                placeholder="Nhập tin nhắn ... "
                fullWidth
                multiline
                value={message}
                endAdornment={
                  <InputAdornment position="end">
                    {message ? (
                      <IconButton onClick={handleSendMessage}>
                        <RiSendPlane2Fill />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <InsertEmoticonIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                }
                onChange={(e) => setMessage(e.target.value)}
                sx={{ paddingY: "10px", paddingLeft: "10px" }}
              />
            </Box>
          </div>
        </Stack>
      </Box>

      {open ? (
        <Box className="info-group">
          <Avatar src={channelUser?.coverUrl} sx={{ width: 70, height: 70 }} />

          <Typography
            variant="subtitle1"
            sx={{ paddingX: "10px", fontWeight: 550, fontSize: 18 }}
          >
            {channelUser?.name}
          </Typography>

          <Divider flexItem sx={{ paddingY: "10px" }} />

          <Typography variant="overline" display="block">
            Thành viên trong nhóm
          </Typography>

          {channelUser.members?.map((member, idx) =>
            member ? (
              <Box className="member-group-channel" key={member.userId}>
                {/* {idx === 0 ? (
                  <Avatar src={DogImg} />
                ) : (
                  <Avatar src={TigerImg} />
                )} */}
                {member.connectionStatus === "online" ? (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar src={member?.plainProfileUrl} />
                  </StyledBadge>
                ) : (
                  <Avatar src={member?.plainProfileUrl} />
                )}
                <Typography sx={{ paddingX: "10px" }}>
                  {member.nickname}
                </Typography>
                {member.role === "operator" ? (
                  <Chip label="Super User" />
                ) : (
                  <Chip label="User" />
                )}
              </Box>
            ) : null
          )}
        </Box>
      ) : null}
    </Box>
  );
}

export default ChatLayout;
