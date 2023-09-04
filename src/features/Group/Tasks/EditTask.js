import React, { useEffect, useState } from "react";

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
import {
  deletePackageTask,
  updatePackageTask,
} from "../../../redux/packageRequest";
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

function EditTask({ grID, item, handleClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const timeStart = new Date(item.startDate);
  const setintialStatusEnd = () => {
    if (!item.isRepeated) {
      return "1";
    } else {
      if (item.recurrence && item.recurrence.ends === "") {
        return "1";
      } else {
        return "2";
      }
    }
  };

  let date = new Date();
  const [name, setName] = useState(item.summary);
  const [status, setStatus] = useState(item.state);
  const [repeat, setRepeat] = useState(item.isRepeated);
  const [numRepeat, setNumRepeat] = useState(
    item.recurrence ? item.recurrence.times : 1
  );
  const [unit, setUnit] = useState(
    item.recurrence ? item.recurrence.unit : "Day"
  );
  const [formats, setFormats] = React.useState(
    item.recurrence && item.recurrence.unit === "Week"
      ? item.recurrence.repeatOn
      : []
  );
  const [startDate, setStartDate] = useState(item.startDate);
  const [time, setTime] = useState(dayjs(timeStart.getTime()));
  const [statusEnd, setStatusEnd] = useState(setintialStatusEnd());
  const [endDate, setEndDate] = useState(
    item.recurrence
      ? item.recurrence.ends === ""
        ? null
        : item.recurrence.ends
      : null
  );
  const [description, setDescription] = useState(item.description);
  const [msg, setMsg] = useState("");
  const [flagTime, setFlagTime] = useState(false);

  const handleStartDateTimePicker = (dateValue) => {
    setStartDate(dateValue.$d);
  };

  const handleChangeTimePicker = (timeValue) => {
    setTime(timeValue.$d);
    setFlagTime(true);
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

  const handleDeleteTask = async () => {
    dispatch(updateProgress(true));
    const res = await deletePackageTask(
      grID,
      item._id,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    if (res === true) {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(true));
      dispatch(updateMessage("Xóa thành công lịch biểu!"));
    } else {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(false));
      dispatch(updateMessage("Xóa thất bại lịch biểu!"));
    }
    handleClose();
  };

  const handleEditTask = async () => {
    setMsg("");
    if (name.length <= 0) {
      setMsg("Vui lòng điền tiêu đề cho lịch biểu!");
      return;
    }
    if (statusEnd === "2" && endDate === null) {
      setMsg("Vui lòng điền ngày kết thúc!");
      return;
    }

    let checkTask = false;
    let checkTaskStatus = false;

    let nowDate = new Date();
    let startDateFormat = new Date(startDate);
    if (!flagTime) {
      let d1 = startDateFormat.setHours(time.$H);
      d1 = new Date(d1).setMinutes(time.$m);
      d1 = new Date(d1).setSeconds(time.$s);
      startDateFormat = new Date(d1).toISOString();
    } else {
      let d1 = startDateFormat.setHours(time.getHours());
      d1 = new Date(d1).setMinutes(time.getMinutes());
      d1 = new Date(d1).setSeconds(time.getSeconds());
      startDateFormat = new Date(d1).toISOString();
    }

    let endDateFormat = new Date(endDate !== null ? endDate : nowDate);
    if (repeat && FormatDate.compareTimes(endDate, startDate)) {
      let d2 = endDateFormat.setHours(23);
      d2 = new Date(d2).setMinutes(59);
      d2 = new Date(d2).setSeconds(59);
      endDateFormat = new Date(d2).toISOString();
    } else {
      let d2 = new Date(startDate).setHours(23);
      d2 = new Date(d2).setMinutes(59);
      d2 = new Date(d2).setSeconds(59);
      endDateFormat = new Date(d2).toISOString();
    }

    if (
      item.summary !== name ||
      item.description !== description ||
      !FormatDate.compareEqualTimes(item.startDate, startDateFormat)
    ) {
      checkTask = true;
    }
    if (item.state !== status) {
      checkTaskStatus = true;
    }
    if (item.isRepeated !== repeat) {
      checkTask = true;
    } else {
      if (repeat === true) {
        if (
          item.recurrence.times !== numRepeat ||
          item.recurrence.unit !== unit
        ) {
          checkTask = true;
        } else {
          if (item.recurrence.unit === "Week") {
            if (item.recurrence.repeatOn !== formats) {
              checkTask = true;
            }
          }
        }
        if (setintialStatusEnd() !== statusEnd) {
          checkTask = true;
        }
        if (
          statusEnd === "2" &&
          !FormatDate.compareEqualTimes(item.recurrence.ends, endDateFormat)
        ) {
          checkTask = true;
        }
      }
    }
    let recurrence = {
      times: numRepeat,
      unit: unit,
      repeatOn: formats,
      ends:  statusEnd === "1" ? "" : endDateFormat,
    };

    let formData1 = {
      summary: name,
      description: description,
      isRepeated: repeat,
      recurrence: recurrence,
      members: item.members,
      startDate: startDateFormat,
      state: status,
    };
    let formData2 = {
      members: item.members,
      state: status,
    };
    if (checkTask || checkTaskStatus) {
      handleClose();
      dispatch(updateProgress(true));
      const res = await updatePackageTask(
        grID,
        item._id,
        formData1,
        formData2,
        checkTask,
        checkTaskStatus,
        user?.accessToken,
        dispatch,
        axiosJWT
      );

      if (res) {
        dispatch(updateProgress(false));
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Chỉnh sửa lịch biểu thành công"));
      } else {
        dispatch(updateProgress(false));
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Chỉnh sửa lịch biểu thất bại"));
      }
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
        <Box flex={1} sx={{ m: 1 }}>
          <DateTimePicker
            valueDay={startDate}
            handleDateTimePicker={handleStartDateTimePicker}
            sizeDateTime={"medium"}
          />
        </Box>
        <Box flex={1} sx={{ m: 1 }}>
          <TimePickerCus
            valueTime={time}
            handleChangeTimePicker={handleChangeTimePicker}
          />
        </Box>
      </Box>
      <Box sx={{ paddingLeft: "5px" }}>
        <FormControlLabel
          control={
            <CustomComponent.TaskSwitch
              sx={{ m: 1 }}
              value={repeat}
              defaultChecked={repeat}
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
      <Box className="btn-edit-task">
        <CustomComponent.Button2 className="btn-btn" onClick={handleDeleteTask}>
          Xóa lịch biểu
        </CustomComponent.Button2>
        <CustomComponent.Button1 className="btn-btn" onClick={handleEditTask}>
          Lưu thay đổi
        </CustomComponent.Button1>
      </Box>
    </Stack>
  );
}

export default EditTask;
