import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "package",
  initialState: {
    showSidebar: false,
    profileID: 1,
    package: [],
    numberCart: 0,
    cart: [],
    flagCart: 0,
    myPackages: null,
    noti: null,
    bill: null,
    todos: null,
    fund: null,
  },
  reducers: {
    setInitialPackage: (state, action) => {
      state.package = action.payload;
    },
    setCarts: (state, action) => {
      state.cart = action.payload;
    },
    updateNumberCart: (state, action) => {
      state.numberCart = action.payload;
    },
    updateNotiCheckout: (state, action) => {
      state.flagCart = action.payload;
    },
    updateShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    toggleShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    updateProfileId: (state, action) => {
      state.profileID = action.payload;
    },
    updateMyPackages: (state, action) => {
      state.myPackages = action.payload;
    },
    updateNotiPackage: (state, action) => {
      state.noti = action.payload;
    },
    updateBill: (state, action) => {
      state.bill = action.payload;
    },
    updateTodos: (state, action) => {
      state.todos = action.payload;
    },
    updateFunding: (state, action) => {
      state.fund = action.payload;
    }
  },
});

export const {
  setInitialPackage,
  setCarts,
  updateNumberCart,
  updateNotiCheckout,
  toggleShowSidebar,
  updateShowSidebar,
  updateProfileId,
  updateMyPackages,
  updateNotiPackage,
  updateBill,
  updateTodos,
  updateFunding,
} = packageSlice.actions;

export default packageSlice.reducer;
