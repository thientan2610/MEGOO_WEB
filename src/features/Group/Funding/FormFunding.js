import React, { useState } from "react";

import {
  Box,
  Input,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DateTimePicker from "../../../component/Date/DateTimePicker";
import * as CustomComponent from "../../../component/custom/CustomComponents";
import "../../../assets/css/Funding.scss";
import { createAxios } from "../../../http/createInstance";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";
import { postPackageFunding } from "../../../redux/packageRequest";
import { updateMessage, updateOpenSnackbar, updateProgress, updateStatus } from "../../../redux/messageSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function FormFunding({ grID, item, handleClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const theme = useTheme();
  const nowDate = new Date();
  const [name, setName] = useState("");
  const [date, setDate] = useState(nowDate);
  const [numRepeat, setNumRepeat] = useState(1);
  const [personSelected, setPersonSelected] = useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [money, setMoney] = useState(1000);
  const [endDate, setEndDate] = useState(nowDate);
  const [times, setTimes] = useState(1);
  const [statusEnd, setStatusEnd] = useState(1);
  const [descr, setDescr] = useState("");

  const handleChangeStatusEnd = (e) => {
    setStatusEnd(e.target.value);
  };

  const handleEndDateTimePicker = (dateValue) => {
    setEndDate(dateValue.$d);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    let newArray = [];
    for (let x of value) {
      let result = item.find(({ name }) => name === x);
      newArray.push(result._id);
    }
    setPersonName(typeof value === "string" ? value.split(",") : value);
    setPersonSelected(newArray);
    console.log(newArray);
  };

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const handleFunding = async () => {
    if (name.length < 0) {
      console.log("Vui lòng nhập tiêu đề");
      return;
    }
    if (money < 1000) {
      console.log("Vui lòng nhập lại tổng tiền");
      return;
    }
    let formData = {
      summary: name,
      description: descr,
      startDate: date,
      times: numRepeat,
      ends: endDate,
      members: personSelected,
      total: money,
    };
    handleClose();
    dispatch(updateProgress(true));
    const res = await postPackageFunding(
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
      dispatch(updateMessage("Tạo phiếu quản lý quỹ thành công"));
    } else {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(false));
      dispatch(updateMessage("Tạo phiếu quản lý quỹ thất bại"));
    }
  };

  return (
    <Stack spacing={2} id="formFormFunding" className="form-group-funding">
      <Input
        placeholder="Tiêu đề"
        value={name}
        fontSize={20}
        className="name-funding"
        onChange={(e) => setName(e.target.value)}
      />
      <Box className="box-group-funding">
        <Typography className="title">Ngày bắt đầu</Typography>
        <DateTimePicker
          valueDay={date}
          handleDateTimePicker={handleDateTimePicker}
          sizeDateTime={"medium"}
        />
      </Box>
      <Box className="box-group-funding">
        <Typography className="title">Tổng tiền</Typography>
        <CurrencyInput
          id="input-example"
          className="currency-input"
          value={money}
          decimalsLimit={2}
          onValueChange={(value) => setMoney(value)}
        />
      </Box>
      <Box className="box-group-funding">
        <Typography className="title">Lặp lại</Typography>
        <TextField
          fullWidth
          value={numRepeat}
          onChange={(e) => setNumRepeat(e.target.value)}
          type="number"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            max: 12,
            min: 1,
            step: 1,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">Tháng</InputAdornment>,
          }}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-multiple-name-label">Chọn thành viên</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            fullWidth
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Chọn thành viên" />}
            MenuProps={MenuProps}
          >
            {item.map((mem) => (
              <MenuItem
                key={mem._id}
                value={mem.name}
                style={getStyles(mem.name, personName, theme)}
              >
                {mem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Stack spacing={1}>
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
                <Box sx={{ width: "284px"}}>
                  <DateTimePicker
                  valueDay={endDate}
                  handleDateTimePicker={handleEndDateTimePicker}
                  sizeDateTime={"medium"}
                />
                </Box>
              }
            />
            <FormControlLabel
              value={3}
              control={<Radio />}
              label={
                <Box className="radio-end-input">
                  <Typography className="text">Sau</Typography>
                  <TextField
                    value={times}
                    onChange={(e) => setTimes(e.target.value)}
                    type="number"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      min: 1,
                      step: 1,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Lần</InputAdornment>
                      ),
                    }}
                    sx={{ width: "250px"}}
                  />
                </Box>
              }
              className="form-control-radio"
            />
          </RadioGroup>
        </FormControl>
        <Box>
          <TextField
            fullWidth
            multiline
            label="Mô tả"
            variant="outlined"
            value={descr}
            onChange={(e) => setDescr(e.target.value)}
          />
        </Box>
        <Box className="form-funding-btn">
          <CustomComponent.Button1 onClick={handleFunding}>
            Lưu
          </CustomComponent.Button1>
        </Box>
      </Stack>
    </Stack>
  );
}

export default FormFunding;
