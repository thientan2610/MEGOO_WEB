import React, { useState } from "react";

import {
  Stack,
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  IconButton,
  Input,
  FormControl,
  InputLabel,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ClearIcon from "@mui/icons-material/Clear";

import { createAxios } from "../../../http/createInstance";
import "../../../assets/css/Group.scss";
import { Colors } from "../../../config/Colors";
import * as CustomComponent from "../../../component/custom/CustomComponents.js";
import DateTimePicker from "../../../component/Date/DateTimePicker";
import { postPackageBill } from "../../../redux/userRequest";
import { loginSuccess } from "../../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMessage,
  updateOpenSnackbar,
  updateProgress,
  updateStatus,
} from "../../../redux/messageSlice";

function FormSpending({ grID, item, handleClose }) {
  const nowDate = new Date();

  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [name, setName] = useState("");
  const [hostName, setHostName] = useState("");
  const [memName, setMemName] = useState([{ _id: "0", name: "", amount: 0 }]);
  const [date, setDate] = useState(nowDate);
  const [money, setMoney] = useState("");
  const [idxUser, setIdxUser] = useState(0);
  const [description, setDescription] = useState("");
  const [addFlag, setAddFlag] = useState(false);
  const [msg, setMsg] = useState("");

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const handleChangeHost = (e) => {
    setHostName(e.target.value);
  };

  const handleChangeMember = (e) => {
    memName.pop();
    let id = e.target.value;
    let member = item.find((x) => x._id === id);
    let formData = {
      _id: id,
      name: member.name,
      amount: 0,
    };
    let array = [...memName];
    array.push(formData);

    setMemName(array);
  };

  const handleChangeAmount = (e, id) => {
    setMoney(e.target.value);
    setIdxUser(id);
  };

  const handleAddMember = () => {
    setAddFlag(false);
    let array = [...memName];
    let last_it = memName[memName.length - 1];
    if (money === "" || last_it._id === "0") {
      setAddFlag(true);
      setMsg("Vui lòng điền đầy đủ!");
      return;
    }

    array[idxUser].amount = money;
    setMoney("");

    if (last_it._id !== "0") {
      let formData = {
        _id: "0",
        name: "",
        amount: 0,
      };
      array.push(formData);
      console.log(array);
      setMemName(array);
    }
  };

  const handleKeyDownAmount = (e) => {
    if (e.key === "Enter") {
      handleAddMember();
    }
  };

  const handleClearMember = (e, id) => {
    let arr = [...memName];
    arr = [...arr.filter((data) => data._id !== id)];
    if (arr.length === 0) {
      let formData = {
        _id: "0",
        name: "",
        amount: 0,
      };
      arr.push(formData);
    }
    setMemName(arr);
  };

  const handleGroupBill = async () => {
    let array = [...memName];
    if (money <= 0) {
      setAddFlag(true);
      setMsg("Vui lòng điền đầy đủ!");
      return;
    }
    array[idxUser].amount = money;
    setMoney("");

    if (name.length === 0) {
      setAddFlag(true);
      setMsg("Vui lòng điền vào ô tiêu đề!");
      return;
    }

    let borrowers = [];
    for (let el of array) {
      if (el._id !== "0") {
        let data = {
          borrower: el._id,
          amount: el.amount,
        };
        borrowers.push(data);
      }
    }

    if (hostName.length === 0 || borrowers.length === 0) {
      setAddFlag(true);
      setMsg("Vui lòng điền chọn thành viên!");
      return;
    }

    for (let mem of borrowers) {
      if (hostName === mem.borrower) {
        setAddFlag(true);
        setMsg("Người chi trả và thành viên mượn tiền trùng nhau!");
        return;
      }
    }

    let formData = {
      summary: name,
      date: date,
      borrowers: borrowers,
      lender: hostName,
      description: description,
    };

    handleClose();
    dispatch(updateProgress(true));

    const res = await postPackageBill(
      grID,
      formData,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    if (res != null) {
      dispatch(updateProgress(false));
      if (res?.statusCode === 201) {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Thêm chi tiêu mới thành công!"));
      } else {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Thêm chi tiêu mới thất bại!"));
      }
    }
  };

  return (
    <Stack
      spacing={2}
      id="modalFormSpending"
      className="modalModalSpending"
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      sx={{ position: "relative" }}
    >
      <Input
        id="modal-modal-title"
        placeholder="Tên chi tiêu"
        value={name}
        fontSize={20}
        className="name-bill"
        onChange={(e) => setName(e.target.value)}
      />
      <Box className="title-group-spending">
        <Typography variant="body2" sx={{ minWidth: "100px" }}>
          Ngày chi tiêu:
        </Typography>
        <DateTimePicker
          valueDay={date}
          handleDateTimePicker={handleDateTimePicker}
          sizeDateTime={"medium"}
        />
      </Box>

      <Box className="title-group-spending">
        <Typography variant="body2" sx={{ minWidth: "100px" }}>
          Người chi trả:
        </Typography>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-host-name"
            id="select-host-name"
            value={hostName}
            onChange={handleChangeHost}
          >
            {item?.map((member) =>
              member ? (
                <MenuItem key={member._id} value={member._id}>
                  {member.name}
                </MenuItem>
              ) : null
            )}
          </Select>
        </FormControl>
      </Box>

      <Box className="title-group-spending">
        <Typography variant="body2" sx={{ minWidth: "100px" }}>
          Mô tả:
        </Typography>
        <TextField
          multiline
          fullWidth
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Box
        className="title-group-spending"
        sx={{ justifyContent: "space-between" }}
      >
        <Typography variant="body2" sx={{ minWidth: "100px" }}>
          Thêm thành viên
        </Typography>
        <IconButton onClick={handleAddMember}>
          <PersonAddAlt1Icon />
        </IconButton>
      </Box>

      {memName?.map((route, idx) =>
        route ? (
          <Box className="form-add-member" key={idx}>
            {route._id !== "0" && route.amount !== 0 ? (
              <Box className="added-member-success">
                <Box flex={2}>
                  <Typography
                    variant="button"
                    display="block"
                    sx={{ fontSize: 14 }}
                  >
                    {route.name}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="button"
                    display="block"
                    sx={{ fontSize: 14 }}
                  >
                    {route.amount} vnd
                  </Typography>
                </Box>
                <Box flex={1} className="bill-btn-deleted">
                  <Typography
                    variant="button"
                    display="block"
                    sx={{ fontSize: 14 }}
                  >
                    pending
                  </Typography>
                  <IconButton onClick={(e) => handleClearMember(e, route._id)}>
                    <ClearIcon sx={{ color: Colors.error }} />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box className="added-member">
                <FormControl sx={{ width: "50%" }}>
                  <InputLabel id="demo-simple-select-member">
                    Chọn thành viên
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-member"
                    id="select-member"
                    value={route._id}
                    label="Chọn thành viên"
                    onChange={handleChangeMember}
                  >
                    {item.map((member) =>
                      member ? (
                        <MenuItem key={member._id} value={member._id}>
                          {member.name}
                        </MenuItem>
                      ) : null
                    )}
                    <MenuItem value="0"></MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ width: "50%", paddingLeft: "10px" }}>
                  <TextField
                    fullWidth
                    type="number"
                    value={money}
                    placeholder="Nhập tiền"
                    onChange={(e) => handleChangeAmount(e, idx)}
                    onKeyDown={handleKeyDownAmount}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      min: 1000,
                      step: 1000,
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        ) : null
      )}
      {addFlag ? (
        <Box>
          <Typography
            variant="caption"
            display="block"
            color={Colors.error}
            sx={{ fontStyle: "italic" }}
          >
            {msg}
          </Typography>
        </Box>
      ) : null}

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomComponent.Button1
          sx={{ width: "100%" }}
          onClick={handleGroupBill}
        >
          Lưu chi tiêu
        </CustomComponent.Button1>
      </Box>
    </Stack>
  );
}

export default FormSpending;
