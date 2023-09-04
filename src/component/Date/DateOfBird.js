import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Colors } from "../../config/Colors";
import CakeIcon from "@mui/icons-material/Cake";
import { InputAdornment } from "@mui/material";

export default function DateOfBird({
  valueDay,
  handleDateTimePicker,
  sizeDateTime,
}) {
  const [dateTime, setDateTime] = React.useState(
    valueDay === null ? null : dayjs(valueDay)
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slotProps={{
          textField: {
            size: sizeDateTime,
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <CakeIcon />
                </InputAdornment>
              ),
            },
          },
        }}
        value={dateTime}
        onChange={(newValue) => {
          setDateTime(newValue);
          handleDateTimePicker(newValue);
        }}
        sx={{
          width: "100%",
        //   display: "flex",
        //   alignItems: "center",
          backgroundColor: Colors.background,
        }}
      />
    </LocalizationProvider>
  );
}
