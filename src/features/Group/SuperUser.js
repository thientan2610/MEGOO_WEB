import React, { useRef, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  Tab,
  Modal,
} from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { AiFillCamera, AiOutlineEdit } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import {
  updateAvatarGroup,
  updateGroupName,
  uploadAvatarGroup,
} from "../../redux/userRequest";
import { createAxios } from "../../http/createInstance";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Group.scss";
import ImgAvatar from "../../assets/img/user.png";
import { Colors } from "../../config/Colors";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import PackagesGroup from "./PackagesGroup";
import OtherPackages from "./OtherPackages";
import { updateMessage, updateOpenSnackbar, updateProgress, updateStatus } from "../../redux/messageSlice";
import * as SB from "../../component/Chat/SendBirdGroupChat.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function SuperUser({ item, title }) {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [image, setImage] = useState(item.avatar ?? ImgAvatar);
  const [name, setName] = useState(item.name);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    const form = new FormData();
    form.append("file", fileObj);
    dispatch(updateProgress(true));
    const res = await uploadAvatarGroup(
      item._id,
      user?.accessToken,
      form,
      axiosJWT
    );

    const formAvatar = new FormData();
    formAvatar.append("avatar", res?.data);
    const result = await updateAvatarGroup(
      item._id,
      user?.accessToken,
      item.channel,
      user?.data.userInfo._id,
      formAvatar,
      dispatch,
      axiosJWT
    );
    if (result) {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(true));
      dispatch(updateMessage("Cập nhật avatar nhóm thành công!"));
      if (item.channel) {
        console.log("update avatar");
        await SB.updateAvatarChannel(item.channel, res.data);
      }
      setImage(res.data);
    } else {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(false));
      dispatch(updateMessage("Cập nhật avatar nhóm thất bại!"));
    }
  };

  const handleButtonSave = async () => {
    let formData = {
      name: name,
    };

    await updateGroupName(
      item._id,
      user?.accessToken,
      item.channel,
      user?.data.userInfo._id,
      formData,
      dispatch,
      axiosJWT
    );

    setOpen(false);
  };

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{ paddingX: { xs: "0px", sm: "0px", md: "10px" }, width: "100%" }}
    >
      <Box className="title-group-spending">
        <Box align={"center"} sx={{ paddingRight: "15px" }}>
          <CustomComponent.ButtonAvatar onClick={handleClick}>
            <CustomComponent.ImageSrc
              style={{ backgroundImage: `url(${image})` }}
            />
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <CustomComponent.ImageBackdrop className="MuiImageBackdrop-root" />
            <CustomComponent.Image>
              <Box bgcolor={Colors.camera} borderRadius={"50%"} padding={"8px"}>
                <AiFillCamera color={Colors.black} size={25} />
              </Box>
            </CustomComponent.Image>
          </CustomComponent.ButtonAvatar>
        </Box>
        <Typography variant="h6" fontSize={22}>
          {item.name}
        </Typography>
        <IconButton onClick={handleOpen}>
          <AiOutlineEdit />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="body2" component="h2">
              Mọi người đều biết khi tên nhóm thay đổi.
            </Typography>
            <TextField
              multiline
              fullWidth
              value={name}
              sx={{ marginY: "10px" }}
              onChange={(e) => setName(e.target.value)}
            />
            <div align="right">
              <CustomComponent.Button1 onClick={handleButtonSave}>
                Lưu
              </CustomComponent.Button1>
            </div>
          </Box>
        </Modal>
      </Box>

      <Box
        sx={{
          width: "100%",
          typography: "body1",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className="title-packages"
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Thông tin"
                value="1"
                sx={{ marginX: { xs: "0px", sm: "0px", md: "40px" } }}
              />
              <Tab
                label="Khác"
                value="2"
                sx={{ marginX: { xs: "0px", sm: "0px", md: "40px" } }}
              />
            </TabList>
          </Box>

          <Box sx={{ width: "100%" }}>
            <TabPanel
              value="1"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <PackagesGroup
                data={item}
                pkg={item.packages.infoPackages[0]}
                title={title}
              />
            </TabPanel>
          </Box>
          <Box sx={{ width: "100%" }}>
            <TabPanel
              value="2"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {item.packages.otherPakages.length > 0 ? (
                <OtherPackages item={item.packages.otherPakages} />
              ) : null}
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Stack>
  );
}

export default SuperUser;
