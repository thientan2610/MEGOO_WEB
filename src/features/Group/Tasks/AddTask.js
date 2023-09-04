import React, { useState } from "react";

import {
  Stack,
  Box,
  Input,
  Select,
  MenuItem,
  FormControlLabel,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateTimePicker from "../../../component/Date/DateTimePicker";
import TimePickerCus from "../../../component/Date/TimePickerCus";
import { createAxios } from "../../../http/createInstance";
import * as CustomComponent from "../../../component/custom/CustomComponents";
import * as FormatDate from "../../../component/custom/FormatDateNumber";
import "../../../assets/css/Group.scss";
import { styled } from "@mui/material/styles";
import { Colors } from "../../../config/Colors";
import { postPackageTask } from "../../../redux/packageRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";
import {
  updateMessage,
  updateOpenSnackbar,
  updateProgress,
  updateStatus,
} from "../../../redux/messageSlice";

import dayjs from "dayjs";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

function AddTask({ grID, item, handleClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  let date = new Date();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Public");
  const [repeat, setRepeat] = useState(false);
  const [numRepeat, setNumRepeat] = useState(1);
  const [unit, setUnit] = useState("Day");
  //const [allDay, setAllDay] = useState(false);
  const [formats, setFormats] = React.useState(() => []);
  const [startDate, setStartDate] = useState(date);
  const [time, setTime] = useState(dayjs(date.getTime()));
  const [statusEnd, setStatusEnd] = useState(1);
  const [endDate, setEndDate] = useState(date);
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  const handleStartDateTimePicker = (dateValue) => {
    setStartDate(dateValue.$d);
  };

  const handleChangeTimePicker = (timeValue) => {
    setTime(timeValue);
  };

  const handleEndDateTimePicker = (dateValue) => {
    setEndDate(dateValue.$d);
  };

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleChangeSwitch = () => {
    setRepeat(!repeat);
  };

  // const handleChangeAllDay = () => {
  //   setAllDay(!allDay);
  // };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleChangeUnit = (e) => {
    setUnit(e.target.value);
  };

  const handleChangeStatusEnd = (e) => {
    setStatusEnd(e.target.value);
  };

  const handleAddEvents = async () => {
    handleClose();
    dispatch(updateProgress(true));
    let d1 = startDate.setHours(time.$H);
    d1 = new Date(d1).setMinutes(time.$m);
    d1 = new Date(d1).setSeconds(time.$s);
    let startDateFormat = new Date(d1).toISOString();

    let endDateFormat = new Date();
    if (repeat && FormatDate.compareTimes(endDate, startDate)) {
      let d2 = endDate.setHours(23);
      d2 = new Date(d2).setMinutes(59);
      d2 = new Date(d2).setSeconds(59);
      endDateFormat = new Date(d2).toISOString();
    } else {
      let d2 = startDate.setHours(23);
      d2 = new Date(d2).setMinutes(59);
      d2 = new Date(d2).setSeconds(59);
      endDateFormat = new Date(d2).toISOString();
    }

    if (name.length <= 0) {
      setMsg("Vui lòng điền vào ô TIÊU ĐỀ!");
      return;
    }

    let recurrence = {
      times: numRepeat,
      unit: unit,
      repeatOn: formats,
      ends: statusEnd === 1 ? "" : endDateFormat,
    };
    console.log(recurrence);

    let members = item.map((mem) => {
      return mem._id;
    });

    let formData = {
      summary: name,
      description: description,
      isRepeated: repeat,
      recurrence: recurrence,
      members: members,
      startDate: startDateFormat,
      state: status,
    };

    const res = await postPackageTask(
      grID,
      formData,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    if (res?.statusCode === 201) {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(true));
      dispatch(updateMessage("Tạo lịch biểu thành công!"));
    } else {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(false));
      dispatch(updateMessage("Tạo lịch biểu thất bại!"));
    }
  };
  return (
    <Stack spacing={1.5} id="createTask" className="createCreateTask">
      <Box
        className="title-group-spending"
        sx={{ justifyContent: "space-between" }}
      >
        <Input
          placeholder="Tiêu đề"
          value={name}
          fontSize={20}
          className="name-bill"
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          className="demo-simple-todos"
          value={status}
          onChange={handleChangeStatus}
        >
          <MenuItem value={"Public"}>Mọi người</MenuItem>
          <MenuItem value={"Private"}>Chỉ mình tôi</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", m: 1 }}>
        <AccessTimeIcon sx={{ m: 1 }} />
        {/* <Box>
          <DateTimePicker
            valueDay={startDate}
            handleDateTimePicker={handleStartDateTimePicker}
            sizeDateTime={"medium"}
          />
        </Box> */}
        <Box flex={1} sx={{ m: 1 }}>
          <DateTimePicker
            valueDay={startDate}
            handleDateTimePicker={handleStartDateTimePicker}
            sizeDateTime={"medium"}
          />
        </Box>
        <Box flex={1} sx={{ m: 1 }}>
          <TimePickerCus handleChangeTimePicker={handleChangeTimePicker} />
        </Box>
      </Box>
      <Box sx={{ paddingLeft: "5px" }}>
        <FormControlLabel
          control={
            <CustomComponent.TaskSwitch
              sx={{ m: 1 }}
              value={repeat}
              onChange={handleChangeSwitch}
            />
          }
          label="Lặp lại"
        />
      </Box>
      {repeat && (
        <Stack sx={{ paddingLeft: "10px" }} spacing={1}>
          {/* <FormControlLabel
            control={<Checkbox value={allDay} onChange={handleChangeAllDay} />}
            label="Cả ngày"
          /> */}
          <Box className="box-repeat">
            <Typography sx={{ paddingRight: "10px" }}>Lặp lại mỗi</Typography>
            <TextField
              size="small"
              value={numRepeat}
              onChange={(e) => setNumRepeat(e.target.value)}
              type="number"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                min: 1,
                step: 1,
              }}
              sx={{ width: "100px" }}
            />
            <Select
              className="demo-simple-todos"
              value={unit}
              onChange={handleChangeUnit}
              size="small"
              sx={{ width: "100px" }}
            >
              <MenuItem value={"Day"}>ngày</MenuItem>
              <MenuItem value={"Week"}>tuần</MenuItem>
            </Select>
          </Box>
          {unit === "Week" && (
            <Box>
              <Typography>Lặp lại vào</Typography>
              <StyledToggleButtonGroup
                size="small"
                color="warning"
                value={formats}
                onChange={handleFormat}
              >
                <ToggleButton value="Mon">
                  <Typography>T2</Typography>
                </ToggleButton>
                <ToggleButton value="Tue">
                  <Typography>T3</Typography>
                </ToggleButton>
                <ToggleButton value="Wed">
                  <Typography>T4</Typography>
                </ToggleButton>
                <ToggleButton value="Thu">
                  <Typography>T5</Typography>
                </ToggleButton>
                <ToggleButton value="Fri">
                  <Typography>T6</Typography>
                </ToggleButton>
                <ToggleButton value="Sat">
                  <Typography>T7</Typography>
                </ToggleButton>
                <ToggleButton value="Sun">
                  <Typography>Cn</Typography>
                </ToggleButton>
              </StyledToggleButtonGroup>
            </Box>
          )}
          <Box>
            <Typography>Kết thúc</Typography>
            <FormControl>
              <RadioGroup value={statusEnd} onChange={handleChangeStatusEnd}>
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Không bao giờ"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label={
                    <DateTimePicker
                      valueDay={endDate}
                      handleDateTimePicker={handleEndDateTimePicker}
                      sizeDateTime={"medium"}
                    />
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Stack>
      )}
      <TextField
        fullWidth
        multiline
        label="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Typography sx={{ fontStyle: "italic", color: Colors.error }}>
        {msg}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomComponent.Button1 onClick={handleAddEvents}>
          Lưu
        </CustomComponent.Button1>
      </Box>
    </Stack>
  );
}

export default AddTask;
