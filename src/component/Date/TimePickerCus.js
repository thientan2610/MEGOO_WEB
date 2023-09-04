import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function TimePickerCus({ valueTime, handleChangeTimePicker }) {
  let date = new Date();
  const [value, setValue] = React.useState(
    valueTime !== null ? dayjs(valueTime) : dayjs(date.getTime())
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["TimePicker", "TimePicker"]}
        sx={{ paddingTop: "0px" }}
      >
        <TimePicker
          slotProps={{
            textField: {
              size: "medium",
            },
          }}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            handleChangeTimePicker(newValue);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
