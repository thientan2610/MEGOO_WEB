import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { usersInvitePeople } from "../../redux/userRequest";
import { createAxios } from "../../http/createInstance";
import { loginSuccess } from "../../redux/authSlice";
import "../../assets/css/Group.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { Colors } from "../../config/Colors";
import PackageGroup from "./PackageGroup";
// import * as SB from "../../component/Chat/SendBirdGroupChat";

function PackagesGroup({ data, pkg, title }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [openInvite, setOpenInvite] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [email, setEmail] = useState("");
  const status = pkg?.status === "Not Activated" ? false : true;

  const handleClickOpenInvite = () => {
    setOpenInvite(true);
  };

  const handleCloseInvite = () => {
    setOpenInvite(false);
  };

  const handleButtonSave = () => {
    let newArray = selectedPeople;
    newArray.push(email);

    setSelectedPeople(newArray);
    setEmail("");
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      handleButtonSave();
    }
  };

  const handleButtonClear = (e, name) => {
    let newArray = [];
    newArray = [...selectedPeople.filter((data) => !(data === name))];

    setSelectedPeople(newArray);
  };

  const handleButtonInvitePeople = async () => {
    let formData = {
      grId: data._id,
      emails: selectedPeople,
      feUrl: "https://megoo.netlify.app/pkg-mgmt/gr/join",
    };
    const res = await usersInvitePeople(user?.accessToken, formData, axiosJWT);
    if (res) {
      setOpenInvite(false);
    }
  };

  return (
    <Stack
      spacing={3}
      sx={{ width: { xs: "90%", sm: "85%", md: "70%" }, maxWidth: "600px" }}
    >
      {pkg ? <PackageGroup item={pkg} data={data} title={title} /> : null}
      <Stack
        spacing={1}
        sx={{
          //width: "100%",
          bgcolor: Colors.background,
          borderRadius: "10px",
          boxShadow: "2px 2px 5px #8c8c8c",
          padding: "20px",
        }}
      >
        <Box
          // sx={{
          //   paddingX: "20px",
          //   paddingTop: "10px",
          // }}
          className="flex-group"
        >
          <Typography variant="h5" color={Colors.textPrimary}>
            Thành viên trong nhóm
          </Typography>
          {title === "SUPER USER" && status ? (
            <CustomComponent.Button1
              sx={{ marginBottom: "10px" }}
              onClick={handleClickOpenInvite}
            >
              Mời thành viên
            </CustomComponent.Button1>
          ) : null}
        </Box>
        {data.members.map((route) =>
          route ? (
            <Box
              key={route.user._id}
              className="package-group"
              sx={{ paddingBottom: "10px" }}
            >
              <Avatar
                src={route.user.avatar}
                sx={{ width: "50px", height: "50px" }}
              />
              <Typography
                variant="overline"
                display="block"
                sx={{ paddingLeft: "20px", fontSize: 18 }}
              >
                {route.user.name}
              </Typography>
            </Box>
          ) : null
        )}
        <Dialog
          open={openInvite}
          onClose={handleCloseInvite}
          fullWidth
          sx={{ width: "50%", paddingLeft: "30%" }}
        >
          <DialogTitle> Thêm thành viên vào nhóm </DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  paddingTop: "5px",
                }}
              >
                <Input
                  placeholder="Nhập địa chỉ mail..."
                  autoFocus
                  type="email"
                  color="success"
                  fullWidth
                  value={email}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleButtonSave}>
                        <RiSendPlane2Fill />
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Box>

              {selectedPeople.map((person, idx) =>
                person ? (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingX: "10px",
                      bgcolor: "#e6f7ff",
                    }}
                  >
                    <Typography> {person} </Typography>
                    <IconButton
                      onClick={(event) => handleButtonClear(event, person)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Box>
                ) : null
              )}

              {selectedPeople.length > 0 ? (
                <CustomComponent.Button1 onClick={handleButtonInvitePeople}>
                  Mời người
                </CustomComponent.Button1>
              ) : null}
            </Stack>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </Stack>
    </Stack>
  );
}

export default PackagesGroup;
