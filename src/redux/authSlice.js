import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            msg: null,
        },
        register: {
            isFetching: false,
            error: false,
            msg: null,
        },
        order: null,
        tokenJoinGr: null,
    }, 
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.msg = null;
            state.login.error = false;
        },
        loginFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.msg = action.payload;
            state.login.currentUser = null;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.msg = action.payload;
            state.register.error = false;
        },
        registerFailed: (state, action) => {
            state.register.isFetching = false;
            state.register.msg = action.payload;
            state.register.error = true;
        },
        logoutStart: (state) => {
            state.login.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.logout.error = false;
        },
        logoutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setTokenJoinGroup: (state, action) => {
            state.tokenJoinGr = action.payload;
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    setOrder,
    setTokenJoinGroup,
} = authSlice.actions;

export default authSlice.reducer;