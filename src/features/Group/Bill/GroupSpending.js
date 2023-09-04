import React, { useEffect, useState } from "react";

import {
  Stack,
  Box,
  Typography,
  Modal,
  Tooltip,
} from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AddIcon from "@mui/icons-material/Add";

import "../../../assets/css/Group.scss";
import { Colors } from "../../../config/Colors";
import * as CustomComponent from "../../../component/custom/CustomComponents";
import FormSpending from "./FormSpending";
import Bill from "./Bill";
import NotificationEmpty from "../NotificationEmpty";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "80%", md: "70%", lg: "50%" },
  height: "50%",
  bgcolor: "background.paper",
  border:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function GroupSpending({ item }) {
  const [open, setOpen] = useState(false);
  const [listMember, setListMember] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getUsersInGroup = () => {
      let array = [];
      for (let member of item.members) {
        let formData = {
          _id: member.user._id,
          name: member.user.name,
        };
        array.push(formData);
      }
      setListMember(array);
    };

    getUsersInGroup();

    return () => {
      getUsersInGroup();
    };
  }, [item.members]);

  return (
    <Stack sx={{ width: "100%" }}>
      <Box className="flex-group">
        <Box className="title-group-spending">
          <MonetizationOnOutlinedIcon className="icon-title" />
          <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
            Quản lý chi tiêu trong nhóm
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <CustomComponent.Button1 onClick={handleOpen}>
            <AddIcon color={Colors.background} />
            Thêm chi tiêu mới
          </CustomComponent.Button1>
        </Box>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <Tooltip title="Thêm chi tiêu mới">
            <CustomComponent.Button1 onClick={handleOpen}>
              <AddIcon color={Colors.background} />
            </CustomComponent.Button1>
          </Tooltip>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormSpending
            grID={item._id}
            item={listMember}
            handleClose={handleClose}
          />
        </Box>
      </Modal>

      {item.billing.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {item.billing?.map((bill) =>
            bill ? <Bill key={bill._id} grID={item._id} item={bill} /> : null
          )}
        </Box>
      ) : (
        <NotificationEmpty msg="Danh sách chi tiêu rỗng" />
      )}
    </Stack>
  );
}

export default GroupSpending;
