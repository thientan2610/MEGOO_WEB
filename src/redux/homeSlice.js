import { createSlice } from "@reduxjs/toolkit";

const homeSlide = createSlice({
  name: "home",
  initialState: {
    homeGroup: [],
    homeTrans: [],
    homeTodos: [],
    homeChat: [],
    homeBilling: [],
  },
  reducers: {
    updateHomeGroups: (state, action) => {
      state.homeGroup = action.payload;
    },
    updateHomeTrans: (state, action) => {
      state.homeTrans = action.payload;
    },
    updateHomeChats: (state, action) => {
      state.homeChat = action.payload;
    },
    updateHomeTodos: (state, action) => {
      state.homeTodos = action.payload;
    },
    updateHomeBilling: (state, action) => {
      state.homeBilling = action.payload;
    },
  },
});

export const {
  updateHomeGroups,
  updateHomeTrans,
  updateHomeChats,
  updateHomeTodos,
  updateHomeBilling,
} = homeSlide.actions;

export default homeSlide.reducer;
