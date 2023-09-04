import React, { useState } from "react";

import {
  Stack,
  Box,
  Checkbox,
  Typography,
  TextField,
  IconButton,
  Modal,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { createAxios } from "../../../http/createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  updateIsCompletedTodo,
} from "../../../redux/packageRequest";
// import { updateTodos } from "../../../redux/packageSlice";
import * as CustomComponent from "../../../component/custom/CustomComponents";
import "../../../assets/css/Todos.scss";
import { Colors } from "../../../config/Colors";
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

function TodoDetail({ grID, item }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [listTodo, setListTodo] = useState(item?.todos);
  const [idxTodo, setIdxTodo] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = (e, idx) => {
    setIdxTodo(idx);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleAddTodo = async () => {
    if (todo.length <= 0) {
      setMsg("Vui lòng điền vào mục CÔNG VIỆC");
      return;
    } 
      let formTodo = {
        todo: todo,
        description: description,
        isCompleted: false,
      };
      let todos = [];
      todos.push(formTodo);
      let formData = {
        todos: todos,
        state: item.state,
      };
      handleClose();
      dispatch(updateProgress(true));
      const res = await addTodo(
        grID,
        item._id,
        formData,
        user?.accessToken,
        dispatch,
        axiosJWT
      );

      if (res != null) {
        dispatch(updateProgress(false));
        if (res?.statusCode === 200) {
          dispatch(updateOpenSnackbar(true));
          dispatch(updateStatus(true));
          dispatch(updateMessage("Thêm việc cần làm thành công!"));
          setTodo("");
          setDescription("");
        } else {
          dispatch(updateOpenSnackbar(true));
          dispatch(updateStatus(false));
          dispatch(updateMessage("Thêm việc cần làm thất bại!"));
        }
      }
    
  };

  const handleDeleteTodo = async () => {
    let newArray = [...listTodo];
    newArray = [...newArray.filter((x) => x._id !== idxTodo)];

    let todos = [];
    let formData = {
      _id: idxTodo,
    };
    todos.push(formData);

    const res = await deleteTodo(item._id, todos, user?.accessToken, axiosJWT);
    console.log(res);
    if (res?.statusCode === 200) {
      setListTodo(newArray);
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(true));
      dispatch(updateMessage("Xóa việc cần làm thành công!"));
    } else {
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(false));
      dispatch(updateMessage("Xóa việc cần làm thất bại!"));
    }
    handleClose();
  };

  const handleIsCompleted = async (e, idx) => {
    let newArray = [...listTodo];
    let newTodo = [];
    let formTodo = {};
    let todo_id = "";
    for (let i = 0; i < newArray.length; i++) {
      let formData = { ...newArray[i] };
      if (i === idx) {
        formData = {
          ...newArray[i],
          isCompleted: !newArray[i].isCompleted,
        };
        todo_id = newArray[i]._id;
        formTodo = {
          todo: newArray[i].todo,
          description: newArray[i].description,
          isCompleted: !newArray[i].isCompleted,
        };
      }
      newTodo.push(formData);
    }

    const res = await updateIsCompletedTodo(
      item._id,
      todo_id,
      formTodo,
      user?.accessToken,
      axiosJWT
    );
    if (res?.statusCode === 200) {
      setListTodo(newTodo);
    } else {
      setListTodo(newArray);
    }
  };

  return (
    <Stack
      spacing={2}
      sx={{ width: "100%" }}
    >
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <TextField
          label="Công việc"
          variant="outlined"
          size="small"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          sx={{
            margin: "5px",
            width: { xs: "100%", md: "50%" },
            borderRadius: "20px",
          }}
        />
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
          }}
          className="form-add-todo"
        >
          <TextField
            label="Mô tả"
            fullWidth
            size="small"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ margin: "5px", borderRadius: "20px" }}
          />
          <CustomComponent.Button2 onClick={handleAddTodo}>
            Thêm
          </CustomComponent.Button2>
        </Box>
      </Box>
      <Typography className="todo-msg">{msg}</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ width: { xs: "calc(100% - 40px)", sm: "calc(50% - 40px)" } }}
          className="box-todo"
        >
          <Box className="title-box">
            <Typography className="text-title">Đang thực hiện</Typography>
          </Box>
          <Stack spacing={1} sx={{ width: "100%" }}>
            {listTodo.length > 0 &&
              listTodo !== null &&
              listTodo.map(
                (todo, idx) =>
                  todo.isCompleted === false && (
                    <Box className="list-todo" key={idx}>
                      <Box>
                        <Box className="todos">
                          <Checkbox
                            checked={todo.isCompleted}
                            onChange={(e) => handleIsCompleted(e, idx)}
                          />
                          <Typography>{todo.todo}</Typography>
                        </Box>
                        <Typography className="text-todo">
                          {todo.description}
                        </Typography>
                      </Box>
                      <IconButton onClick={(e) => handleOpen(e, todo._id)}>
                        <ClearIcon sx={{ color: Colors.error }} />
                      </IconButton>
                    </Box>
                  )
              )}
          </Stack>
        </Box>
        <Box
          sx={{ width: { xs: "calc(100% - 40px)", sm: "calc(50% - 40px)" } }}
          className="box-todo"
        >
          <Box className="title-box">
            <Typography className="text-title">Đã hoàn thành</Typography>
          </Box>
          <Stack spacing={1} sx={{ width: "100%" }}>
            {listTodo.length > 0 &&
              listTodo !== null &&
              listTodo.map(
                (todo, idx) =>
                  todo.isCompleted === true && (
                    <Box className="list-todo" key={idx}>
                      <Box>
                        <Box className="todos">
                          <Checkbox
                            checked={todo.isCompleted}
                            onChange={(e) => handleIsCompleted(e, idx)}
                          />
                          <Typography>{todo.todo}</Typography>
                        </Box>
                        <Typography className="text-todo">
                          {todo.description}
                        </Typography>
                      </Box>
                      <IconButton onClick={(e) => handleOpen(e, todo._id)}>
                        <ClearIcon sx={{ color: Colors.error }} />
                      </IconButton>
                    </Box>
                  )
              )}
          </Stack>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography>Bạn có muốn xóa chi tiêu này không?</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CustomComponent.Button1
              sx={{ width: "40px", marginRight: "10px" }}
              onClick={handleDeleteTodo}
            >
              Có
            </CustomComponent.Button1>
            <CustomComponent.Button2
              sx={{ width: "40px", marginLeft: "10px" }}
              onClick={handleClose}
            >
              Không
            </CustomComponent.Button2>
          </Box>
        </Box>
      </Modal>
    </Stack>
  );
}

export default TodoDetail;
