import React, { useState } from "react";

import {
  Stack,
  Box,
  Typography,
  IconButton,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Tooltip,
} from "@mui/material";
//import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteIcon from "@mui/icons-material/Delete";
// import EventIcon from "@mui/icons-material/Event";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createAxios } from "../../../http/createInstance";
import { Colors } from "../../../config/Colors";
import FormTodos from "./FormTodos";
import TodoDetail from "./TodoDetail";
import { useDispatch, useSelector } from "react-redux";
import { updateTodos } from "../../../redux/packageSlice";
import { deletedTodos } from "../../../redux/packageRequest";
import { loginSuccess } from "../../../redux/authSlice";
import * as CustomComponent from "../../../component/custom/CustomComponents";
import {
  updateMessage,
  updateOpenSnackbar,
  updateProgress,
  updateStatus,
} from "../../../redux/messageSlice";
import AddIcon from "@mui/icons-material/Add";
import NotificationEmpty from "../NotificationEmpty";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "80%", md: "70%", lg: "50%" },
  bgcolor: "background.paper",
  border:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "15px",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function GroupTodos({ grId, item }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [open, setOpen] = useState(false);
  const [idxTodo, setIdxTodo] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeAccordion = (todo) => (event, isExpanded) => {
    setExpanded(isExpanded ? todo._id : false);
    dispatch(updateTodos(todo));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenModal = (e, todo) => {
    setIdxTodo(todo._id);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteTodos = async () => {
    handleCloseModal();
    dispatch(updateProgress(true));
    const res = await deletedTodos(
      grId,
      idxTodo,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    if (res != null) {
      dispatch(updateProgress(false));
      if (res?.statusCode === 200) {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Xóa việc cần làm thành công!"));
      } else {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Xóa việc cần làm thất bại!"));
      }
    }
  };
  return (
    <Stack
      sx={{ width: "100%" }}
      spacing={2}
    >
      <Box className="flex-group">
        <Box className="title-group-spending">
          <TaskAltIcon
            sx={{
              paddingRight: "10px",
              color: Colors.textPrimary,
              fontSize: "50px",
            }}
          />
          <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
            Các việc cần làm trong nhóm
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <CustomComponent.Button1 onClick={handleOpen}>
            <AddIcon color={Colors.background} />
            Thêm 
          </CustomComponent.Button1>
        </Box>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <Tooltip title="Thêm chi tiêu mới">
            <CustomComponent.Button1 onClick={handleOpen}>
              <AddIcon color={Colors.background} />
            </CustomComponent.Button1>
          </Tooltip>
        </Box>
        {/* <IconButton onClick={handleOpen}>
          <AddTaskIcon sx={{ color: Colors.textPrimary, fontSize: "32px" }} />
        </IconButton> */}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormTodos todoID={item._id} handleClose={handleClose} />
        </Box>
      </Modal>

      {item?.todos !== null && item?.todos?.length > 0
        ? item.todos.map((todo, idx) =>
            todo ? (
              <Accordion
                key={idx}
                expanded={expanded === todo._id}
                onChange={handleChangeAccordion(todo)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${todo._id}-content`}
                  id={`${todo._id}-header`}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 500,
                    }}
                  >
                    {todo.summary}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {todo !== null && <TodoDetail grID={grId} item={todo} />}
                </AccordionDetails>
                <AccordionActions>
                  <IconButton onClick={(e) => handleOpenModal(e, todo)}>
                    <DeleteIcon sx={{ color: Colors.error }} />
                  </IconButton>
                </AccordionActions>
              </Accordion>
            ) : null
          )
        : (
          <NotificationEmpty msg="Danh sách việc cần làm rỗng" />
        )}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={styleModal}>
          <Typography>Bạn có muốn xóa chi tiêu này không?</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CustomComponent.Button1
              sx={{ width: "40px", marginRight: "10px" }}
              onClick={handleDeleteTodos}
            >
              Có
            </CustomComponent.Button1>
            <CustomComponent.Button2
              sx={{ width: "40px", marginLeft: "10px" }}
              onClick={handleCloseModal}
            >
              Không
            </CustomComponent.Button2>
          </Box>
        </Box>
      </Modal>
      {/* {flag && (
        <Box sx={{ position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress />
        </Box>
      )} */}
    </Stack>
  );
}

export default GroupTodos;
