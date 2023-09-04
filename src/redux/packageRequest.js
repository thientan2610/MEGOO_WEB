import apiClient from "../http/http-common.js";

// import dataPackage from "../data/dataPackage.js";
import {
  setCarts,
  setInitialPackage,
  updateMyPackages,
  updateNotiPackage,
  updateNumberCart,
  updateTodos,
} from "./packageSlice.js";
import { getGroupByUserId } from "./userRequest.js";
import { updateGroupId, updateGroupItemId } from "./userSlice.js";

export const getAllPackage = async (dispatch) => {
  try {
    const res = await apiClient.get("/pkg-mgmt/pkg");

    let dataPackage = [
      {
        title: "CÁC GÓI NGƯỜI DÙNG",
        status: true,
        child: [],
      },
      {
        title: "CÁC TIỆN ÍCH",
        status: false,
        child: [],
      },
    ];

    for (let item of res.data.data) {
      dataPackage[0].child.push(item);
    }

    dispatch(setInitialPackage(dataPackage));

    let formNoti = {
      statusNoti: 0,
      msgNoti: "",
    };

    dispatch(updateNotiPackage(formNoti));
  } catch (error) {
    return error.response.data;
  }
};

export const getDetailPackage = async (pakageID) => {
  try {
    const res = await apiClient.get(`/pkg-mgmt/pkg/${pakageID}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserCart = async (userID, token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`/users/${userID}/cart`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(res?.data.cart);

    dispatch(setCarts(res?.data.cart));

    dispatch(updateNumberCart(res?.data.cart.length));
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserCart = async (
  userID,
  cart,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.put(`/users/${userID}/cart`, cart, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getUserCart(userID, token, dispatch, axiosJWT);

    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postPackageTodos = async (
  group_id,
  data,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.post(`/pkg-mgmt/todos/${group_id}`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res?.data.statusCode === 201) {
      await getGroupByUserId(token, dispatch, axiosJWT);
      dispatch(updateGroupId(group_id));
      dispatch(updateGroupItemId(3));
    }
    return res?.data;
  } catch (error) {
    dispatch(updateGroupId(group_id));
    dispatch(updateGroupItemId(3));
    return error.response.data;
  }
};

export const addTodo = async (grID, id, data, token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/pkg-mgmt/todos/${id}/todo`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res?.data.statusCode === 200) {
      await getGroupByUserId(token, dispatch, axiosJWT);
      dispatch(updateGroupId(grID));
      dispatch(updateGroupItemId(3));
    }
    return res?.data;
  } catch (error) {
    dispatch(updateGroupId(grID));
    dispatch(updateGroupItemId(3));
    return error.response.data;
  }
};

export const getTodo = async (id, token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`/pkg-mgmt/todos/${id}`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res?.data?.statusCode === 200) {
      dispatch(updateTodos(res?.data.todos));
    }
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTodo = async (id, data, token, axiosJWT) => {
  try {
    const res = await axiosJWT.delete(`/pkg-mgmt/todos/${id}/todo`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateIsCompletedTodo = async (
  id,
  todo_id,
  data,
  token,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.put(
      `/pkg-mgmt/todos/${id}/todo/${todo_id}`,
      data,
      {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deletedTodos = async (grID, id, token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.delete(`/pkg-mgmt/todos/${id}`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data.statusCode === 200) {
      await getGroupByUserId(token, dispatch, axiosJWT);
      dispatch(updateGroupId(grID));
      dispatch(updateGroupItemId(3));
    }
    return res?.data;
  } catch (error) {
    dispatch(updateGroupId(grID));
    dispatch(updateGroupItemId(3));
    return error.response.data;
  }
};

export const postPackageTask = async (
  grID,
  data,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.post(`/pkg-mgmt/task/${grID}`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data.statusCode === 201) {
      await getGroupByUserId(token, dispatch, axiosJWT);
      dispatch(updateGroupId(grID));
      dispatch(updateGroupItemId(4));
    }
    return res?.data;
  } catch (error) {
    dispatch(updateGroupId(grID));
    dispatch(updateGroupItemId(4));
    return error.response.data;
  }
};

export const getPackageTask = async (id, token, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`/pkg-mgmt/task/${id}`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deletePackageTask = async (
  grID,
  id,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.delete(`/pkg-mgmt/task/${id}`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data.statusCode === 200) {
      await getGroupByUserId(token, dispatch, axiosJWT);
      dispatch(updateGroupId(grID));
      dispatch(updateGroupItemId(4));
    }
    return true;
  } catch (error) {
    dispatch(updateGroupId(grID));
    dispatch(updateGroupItemId(4));
    return false;
  }
};

export const updatePackageTask = async (
  grID,
  id,
  data1,
  data2,
  checkTask,
  checkTaskStatus,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    if (checkTask) {
      await axiosJWT.put(`/pkg-mgmt/task/${id}`, data1, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (checkTaskStatus) {
      await axiosJWT.put(`/pkg-mgmt/task/${id}/state`, data2, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
    }

    await getGroupByUserId(token, dispatch, axiosJWT);
    dispatch(updateGroupId(grID));
    dispatch(updateGroupItemId(4));

    return true;
  } catch (error) {
    dispatch(updateGroupId(grID));
    dispatch(updateGroupItemId(4));
    return false;
  }
};

export const GetGroupSuperUser = async (token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`/pkg-mgmt/gr/user`, {
      params: {
        projection: "packages",
        role: "Super User",
        page: 0,
        sort: "-createdAt",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data.statusCode === 200) {
      dispatch(updateMyPackages(res?.data.groups));
    }
  } catch (error) {
    return error.response.data;
  }
};

export const postPackageFunding = async (
  group_id,
  data,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.post(`/pkg-mgmt/funding/${group_id}`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    await getGroupByUserId(token, dispatch, axiosJWT);
    dispatch(updateGroupId(group_id));
    dispatch(updateGroupItemId(1));
    return res?.data;
  } catch (error) {
    dispatch(updateGroupId(group_id));
    dispatch(updateGroupItemId(1));
    return error.response.data;
  }
};

export const deletePackageFunding = async (
  group_id,
  id,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.delete(`/pkg-mgmt/funding/${id}`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res?.data);
    await getGroupByUserId(token, dispatch, axiosJWT);
    dispatch(updateGroupId(group_id));
    dispatch(updateGroupItemId(1));
    return true;
  } catch (error) {
    dispatch(updateGroupId(group_id));
    dispatch(updateGroupItemId(1));
    return false;
  }
};
