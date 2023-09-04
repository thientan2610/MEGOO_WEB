import apiClient from "../http/http-common";

import {
  updateHomeBilling,
  updateHomeChats,
  updateHomeGroups,
  updateHomeTodos,
  updateHomeTrans,
} from "./homeSlice";

export const getGroupsUser = async (token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/pkg-mgmt/gr/user", {
      params: {
        projection: "name;avatar",
        page: 0,
        limit: 10,
        sort: "-createdAt",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(updateHomeGroups(res?.data.groups));
  } catch (error) {
    dispatch(updateHomeGroups([]));
  }
};

export const getTransitionUser = async (userId, token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`/txn/${userId}`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(updateHomeTrans(res?.data.data));
  } catch (error) {
    dispatch(updateHomeTrans([]));
  }
};

export const getChatsUser = async (token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/pkg-mgmt/gr/user", {
      params: {
        projection: "name;channel",
        page: 0,
        limit: 10,
        sort: "-createdAt",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    let arr = [];
    for (let c of res?.data.groups) {
      if (c.channel) {
        arr.push(c);
      }
    }
    dispatch(updateHomeChats(arr));
  } catch (error) {
    dispatch(updateHomeChats([]));
  }
};

export const getTodosUser = async (token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/pkg-mgmt/gr/user", {
      params: {
        projection: "todos",
        page: 0,
        limit: 10,
        sort: "-createdAt",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    let arr = [];
    for (let t of res?.data.groups) {
      if (t.todos.length > 0) {
        for (let tt of t.todos) {
          arr.push(tt);
        }
      }
    }
    dispatch(updateHomeTodos(arr));
  } catch (error) {
    dispatch(updateHomeTodos([]));
  }
};

export const getBillingsUser = async (token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/pkg-mgmt/gr/user", {
      params: {
        projection: "billing",
        page: 0,
        limit: 5,
        sort: "-createdAt",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    let arr = [];
    for (let b of res?.data.groups) {
      if (b.billing.length > 0) {
        for (let bil of b.billing) {
          arr.push(bil);
        }
      }
    }
    dispatch(updateHomeBilling(arr));
  } catch (error) {
    dispatch(updateHomeBilling([]));
  }
};
