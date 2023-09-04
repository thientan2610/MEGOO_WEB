import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    isProgress: false,
    flag: false,
    status: false,
    msg: "",
  },
  reducers: {
    updateProgress: (state, action) => {
      state.isProgress = action.payload;
    },
    updateOpenSnackbar: (state, action) => {
      state.flag = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    updateMessage: (state, action) => {
      state.msg = action.payload;
    },
  },
});

export const { updateProgress, updateOpenSnackbar, updateStatus, updateMessage } =
  messageSlice.actions;

export default messageSlice.reducer;
