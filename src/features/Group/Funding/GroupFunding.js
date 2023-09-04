import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { GiReceiveMoney } from "react-icons/gi";
import "../../../assets/css/Funding.scss";
import { Colors } from "../../../config/Colors";
import * as CustomComponent from "../../../component/custom/CustomComponents";
import AddIcon from "@mui/icons-material/Add";
import FormFunding from "./FormFunding";
import FundingDetail from "./FundingDetail";
import { updateFunding } from "../../../redux/packageSlice";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../http/createInstance";
import { deletePackageFunding } from "../../../redux/packageRequest";
import {
  updateMessage,
  updateOpenSnackbar,
  updateProgress,
  updateStatus,
} from "../../../redux/messageSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "60%", md: "50%", lg: "30%" },
  //height: "50%",
  bgcolor: "background.paper",
  border:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function GroupFunding({ item, title }) {
  console.log(item);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [listMember, setListMember] = useState();
  const [expanded, setExpanded] = React.useState(false);

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleChangeAccordion = (fun) => (event, isExpanded) => {
    setExpanded(isExpanded ? fun._id : false);
    dispatch(updateFunding(fun));
  };

  const handleDeleteFund = async (e, fund) => {
    dispatch(updateProgress(true));
    const res = await deletePackageFunding(
      item?._id,
      fund?._id,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    if (res === true) {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(true));
      dispatch(updateMessage("Xóa thành công quản lý quỹ"));
    } else {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(false));
      dispatch(updateMessage("Xóa thất bại quản lý quỹ"));
    }
  };

  const handleEditFund = async (e, fund) => {};

  useEffect(() => {
    const getUsersInGroup = () => {
      let array = [];
      for (let member of item.members) {
        let formData = {
          _id: member.user._id,
          name: member.user.name,
          avatar: member.user.avatar,
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
      <Box className="funding-box">
        <Box className="title-group-funding">
          <GiReceiveMoney className="icon-title" />
          <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
            Quản lý tiền chung
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <CustomComponent.Button1 onClick={handleOpen}>
            <AddIcon color={Colors.background} />
            Thêm
          </CustomComponent.Button1>
        </Box>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <Tooltip title="Thêm">
            <CustomComponent.Button1 onClick={handleOpen}>
              <AddIcon color={Colors.background} />
            </CustomComponent.Button1>
          </Tooltip>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormFunding
            grID={item._id}
            item={listMember}
            handleClose={handleClose}
          />
        </Box>
      </Modal>

      <Stack spacing={2} mt={2}>
        {item && item?.funding.length > 0 ? (
          item.funding.map((funding, idx) =>
            funding ? (
              <Accordion
                key={idx}
                expanded={expanded === funding._id}
                onChange={handleChangeAccordion(funding)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${funding._id}-content`}
                  id={`${funding._id}-header`}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 500,
                      marginRight: "10px",
                      display: "table-cell",
                      width: "50%",
                    }}
                  >
                    {funding.summary}
                  </Typography>
                  <CustomComponent.ChipFunding4
                    sx={{ width: "100px" }}
                    label="Pending"
                  />
                </AccordionSummary>
                <AccordionDetails>
                  {funding !== null && (
                    <FundingDetail
                      key={funding._id}
                      item={funding}
                      title={title}
                      members={listMember}
                    />
                  )}
                </AccordionDetails>
                <AccordionActions>
                  <CustomComponent.Button2
                    onClick={(e) => handleDeleteFund(e, funding)}
                  >
                    Xóa
                  </CustomComponent.Button2>
                  <CustomComponent.Button1
                    onClick={(e) => handleEditFund(e, funding)}
                  >
                    Chỉnh sửa
                  </CustomComponent.Button1>
                </AccordionActions>
              </Accordion>
            ) : null
          )
        ) : (
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography>Danh sách quản lý quỹ tiền chung rỗng</Typography>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

export default GroupFunding;
