import { Box, Button, Modal, TextField } from "@mui/material";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Colors } from "../../config/Colors";
import "../../assets/css/Calendar.scss";
import EditTask from "../../features/Group/Tasks/EditTask";
import { getPackageTask } from "../../redux/packageRequest";
import { createAxios } from "../../http/createInstance";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import * as FormatDate from "../custom/FormatDateNumber";

const locales = {
  //vi: require("date-fns/locale/vi"),
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", sm: "60%", md: "50%", lg: "30%" },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

const CalendarComponent = ({ grID, events }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [open, setOpen] = React.useState(false);
  const [task, setTask] = useState();
  //const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectEvent = async (calEvent) => {
    
    const res = await getPackageTask(calEvent.id, user?.accessToken, axiosJWT);
    if (res?.statusCode === 200) {
      console.log(res?.task);
      setTask(res?.task);
      setOpen(true);
    }
  };

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        style={{ height: 500, margin: "50px" }}
      />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <EditTask grID={grID} item={task} handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
