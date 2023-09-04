import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Modal,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";

import { createAxios } from "../../http/createInstance.js";
import { Colors } from "../../config/Colors";
import { useDispatch, useSelector } from "react-redux";
import { usersSearch } from "../../redux/userRequest.js";
import { loginSuccess } from "../../redux/authSlice.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalInvitePeople() {
  let topSearchPeople = [];

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [input, setInput] = useState();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const res = await usersSearch(user?.accessToken, input, axiosJWT);
      console.log(res);
    }
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Box
            sx={{
              width: "100%",
              backgroundColor: Colors.search,
            }}
          >
            <Autocomplete
              freeSolo
              disableClearable
              id="search-invite-people"
              options={topSearchPeople}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              )}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalInvitePeople;
