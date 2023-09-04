import apiClient from "../http/http-common.js";
import { setOrder } from "./authSlice.js";
import * as SB from "../component/Chat/SendBirdGroupChat.js";
import {
  getGroupAll,
  getUserInforFailed,
  getUserInforStart,
  getUserInforSuccess,
  getChannels,
  updateGroupId,
  updateGroupItemId,
} from "./userSlice";

export const getInformationUser = async (userID, token, dispatch, axiosJWT) => {
  dispatch(getUserInforStart());
  try {
    const res = await axiosJWT.get(`/users/${userID}`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getUserInforSuccess(res?.data));
  } catch (error) {
    dispatch(getUserInforFailed());
  }
};

export const updateInformationUser = async (
  userID,
  token,
  user,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.put(`/users/${userID}`, user, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getInformationUser(userID, token, dispatch, axiosJWT);

    return res?.data;
  } catch (error) {
    dispatch(getUserInforFailed());
    return error.response.data;
  }
};

export const uploadFile = async (id, token, file) => {
  try {
    const res = await apiClient.post("/file/upload-avatar", file, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateAvatarUser = async (
  userID,
  token,
  data,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.post(`/users/${userID}/avatar`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    await getInformationUser(userID, token, dispatch, axiosJWT);
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getSettingUser = async (userID) => {
  try {
    const res = await apiClient.get(`/users/${userID}/setting`);
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateSettingUser = async (
  userID,
  token,
  user,
  dispatch,
  axiosJWT
) => {
  try {
    await axiosJWT.put(`/users/${userID}/setting`, user, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    await getInformationUser(userID, token, dispatch, axiosJWT);
  } catch (error) {
    return error.response.data;
  }
};

export const userCheckout = async (token, dispatch, user, axiosJWT) => {
  try {
    const res = await axiosJWT.post("/users/checkout", user, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res?.data);
    dispatch(setOrder(res?.data));
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getGroupByUserId = async (token, dispatch, axiosJWT) => {
  try {
    const resSU_group = await axiosJWT.get("/pkg-mgmt/gr/user", {
      params: {
        projection: "name;avatar;channel;packages;members;billing;todos;task;funding",
        role: "Super User",
        page: 0,
        limit: 10,
        sort: "-createdAt",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    const resU_group = await axiosJWT.get("/pkg-mgmt/gr/user", {
      params: {
        projection: "name;avatar;channel;packages;members;billing;todos;task;funding",
        role: "User",
        page: 0,
        limit: 10,
        sort: "-createdAt",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (
      resSU_group?.data.groups.length > 0 ||
      resU_group?.data.groups.length > 0
    ) {
      let dataGroup = [
        {
          name: "SUPER USER",
          _id: 0,
          status: true,
          child: [],
        },
        {
          name: "USER",
          _id: 1,
          status: false,
          child: [],
        },
      ];

      if (
        resSU_group?.data.groups.length > 0 &&
        resU_group?.data.groups.length > 0
      ) {
        for (let item of resSU_group?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0]);
          } else {
            for (let i = 0; i < item.packages.length; i++) {
              if (item.packages[i].status === "Active") {
                infoPackages.push(item.packages[i]);
              } else {
                otherPakages.push(item.packages[i]);
              }
            }
          }

          let packages = {
            infoPackages: infoPackages,
            otherPakages: otherPakages,
          };

          let itemInfo = {
            _id: item._id,
            name: item.name,
            avatar: item.avatar,
            channel: item.channel,
            packages: packages,
            members: item.members,
          };

          let itemSpending = {
            _id: item._id,
            members: item.members,
            billing: item.billing,
          };

          let itemFunding = {
            _id: item._id,
            members: item.members,
            funding: item.funding,
          };

          let itemTodos = {
            _id: item._id,
            todos: item.todos,
          };

          let itemCalendar = {
            _id: item._id,
            members: item.members,
            task: item.task,
          };

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              group: itemInfo,
            },
            {
              _id: 1,
              name: "Quản lý quỹ",
              group: itemFunding,
            },
            {
              _id: 2,
              name: "Quản lý nợ",
              group: itemSpending,
            },
            {
              _id: 3,
              name: "Việc cần làm",
              group: itemTodos,
            },
            {
              _id: 4,
              name: "Lịch biểu",
              group: itemCalendar,
            },
          ];

          for (let gr of childGroupItem) {
            formData.child.push(gr);
          }
          dataGroup[0].child.push(formData);
        }
        dataGroup[0].child[0].status = true;
        dispatch(updateGroupId(dataGroup[0].child[0]._id));

        for (let item of resU_group?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0]);
          } else {
            for (let i = 0; i < item.packages.length; i++) {
              if (item.packages[i].status === "Active") {
                infoPackages.push(item.packages[i]);
              } else {
                otherPakages.push(item.packages[i]);
              }
            }
          }

          let packages = {
            infoPackages: infoPackages,
            otherPakages: otherPakages,
          };

          let itemInfo = {
            _id: item._id,
            name: item.name,
            avatar: item.avatar,
            channel: item.channel,
            packages: packages,
            members: item.members,
          };

          let itemSpending = {
            _id: item._id,
            members: item.members,
            billing: item.billing,
          };

          let itemFunding = {
            _id: item._id,
            members: item.members,
            funding: item.funding,
          };

          let itemTodos = {
            _id: item._id,
            todos: item.todos,
          };

          let itemCalendar = {
            _id: item._id,
            members: item.members,
            task: item.task,
          };

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              group: itemInfo,
            },
            {
              _id: 1,
              name: "Quản lý quỹ",
              group: itemFunding,
            },
            {
              _id: 2,
              name: "Quản lý nợ",
              group: itemSpending,
            },
            {
              _id: 3,
              name: "Việc cần làm",
              group: itemTodos,
            },
            {
              _id: 4,
              name: "Lịch biểu",
              group: itemCalendar,
            },
          ];

          for (let gr of childGroupItem) {
            formData.child.push(gr);
          }
          dataGroup[1].child.push(formData);
        }
      } else if (
        resSU_group?.data.groups.length > 0 &&
        resU_group?.data.groups.length === 0
      ) {
        for (let item of resSU_group?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0]);
          } else {
            for (let i = 0; i < item.packages.length; i++) {
              if (item.packages[i].status === "Active") {
                infoPackages.push(item.packages[i]);
              } else {
                otherPakages.push(item.packages[i]);
              }
            }
          }

          let packages = {
            infoPackages: infoPackages,
            otherPakages: otherPakages,
          };

          let itemInfo = {
            _id: item._id,
            name: item.name,
            avatar: item.avatar,
            channel: item.channel,
            packages: packages,
            members: item.members,
          };

          let itemSpending = {
            _id: item._id,
            members: item.members,
            billing: item.billing,
          };

          let itemFunding = {
            _id: item._id,
            members: item.members,
            funding: item.funding,
          };

          let itemTodos = {
            _id: item._id,
            todos: item.todos,
          };

          let itemCalendar = {
            _id: item._id,
            members: item.members,
            task: item.task,
          };

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              group: itemInfo,
            },
            {
              _id: 1,
              name: "Quản lý quỹ",
              group: itemFunding,
            },
            {
              _id: 2,
              name: "Quản lý nợ",
              group: itemSpending,
            },
            {
              _id: 3,
              name: "Việc cần làm",
              group: itemTodos,
            },
            {
              _id: 4,
              name: "Lịch biểu",
              group: itemCalendar,
            },
          ];

          for (let gr of childGroupItem) {
            formData.child.push(gr);
          }
          dataGroup[0].child.push(formData);
        }
        dataGroup[0].child[0].status = true;
        dispatch(updateGroupId(dataGroup[0].child[0]._id));
      } else {
        dataGroup[0].status = false;
        dataGroup[1].status = true;
        for (let item of resU_group?.data.groups) {
          let formData = {
            _id: item._id,
            name: item.name,
            status: false,
            child: [],
          };

          let infoPackages = [];
          let otherPakages = [];

          if (item.packages.length === 1) {
            infoPackages.push(item.packages[0]);
          } else {
            for (let i = 0; i < item.packages.length; i++) {
              if (item.packages[i].status === "Active") {
                infoPackages.push(item.packages[i]);
              } else {
                otherPakages.push(item.packages[i]);
              }
            }
          }

          let packages = {
            infoPackages: infoPackages,
            otherPakages: otherPakages,
          };

          let itemInfo = {
            _id: item._id,
            name: item.name,
            avatar: item.avatar,
            channel: item.channel,
            packages: packages,
            members: item.members,
          };

          let itemSpending = {
            _id: item._id,
            members: item.members,
            billing: item.billing,
          };

          let itemFunding = {
            _id: item._id,
            members: item.members,
            funding: item.funding,
          };

          let itemTodos = {
            _id: item._id,
            todos: item.todos,
          };

          let itemCalendar = {
            _id: item._id,
            members: item.members,
            task: item.task,
          };

          let childGroupItem = [
            {
              _id: 0,
              name: "Thông tin nhóm",
              group: itemInfo,
            },
            {
              _id: 1,
              name: "Quản lý quỹ",
              group: itemFunding,
            },
            {
              _id: 2,
              name: "Quản lý nợ",
              group: itemSpending,
            },
            {
              _id: 3,
              name: "Việc cần làm",
              group: itemTodos,
            },
            {
              _id: 4,
              name: "Lịch biểu",
              group: itemCalendar,
            },
          ];

          for (let gr of childGroupItem) {
            formData.child.push(gr);
          }
          dataGroup[1].child.push(formData);
        }
        dataGroup[1].child[0].status = true;
        dispatch(updateGroupId(dataGroup[1].child[0]._id));
      }

      dispatch(getGroupAll(dataGroup));
      dispatch(updateGroupItemId(0));
    } else {
      dispatch(updateGroupId(0));
      dispatch(getGroupAll([]));
      dispatch(updateGroupItemId(0));
    }
  } catch (error) {
    return error.response.data;
  }
};

export const usersSearch = async (token, search, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/users/search", {
      params: {
        keyword: search,
      },
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

export const usersInvitePeople = async (token, data, axiosJWT) => {
  try {
    const res = await axiosJWT.post("/pkg-mgmt/gr/inv", data, {
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

export const uploadAvatarGroup = async (id, token, file, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/file/upload-gr-avatar/${id}`, file, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateAvatarGroup = async (
  id,
  token,
  channel,
  userID,
  file,
  dispatch,
  axiosJWT
) => {
  try {
    await axiosJWT.post(`/pkg-mgmt/gr/${id}/avatar`, file, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getGroupByUserId(token, dispatch, axiosJWT);

    return true;
  } catch (error) {
    // return error.response.data;
    return false;
  }
};

export const updateGroupName = async (
  id,
  token,
  channel,
  userID,
  name,
  dispatch,
  axiosJWT
) => {
  try {
    await axiosJWT.put(`/pkg-mgmt/gr/${id}`, name, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getGroupByUserId(token, dispatch, axiosJWT);
  } catch (error) {
    return error.response.data;
  }
};

export const updateActivatePackage = async (
  id,
  token,
  data,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.post(`/pkg-mgmt/gr/${id}/activate`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getGroupByUserId(token, dispatch, axiosJWT);

    dispatch(updateGroupId(id));
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const userRenewGroup = async (grId, token, dispatch, data, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`/users/renew/${grId}`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setOrder(res?.data));
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getGroupChannel = async (token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/pkg-mgmt/gr/user", {
      params: {
        projection: "channel;members",
        page: 0,
        limit: 20,
        sort: "-createdAt",
      },
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    let newArray = [];
    for (let item of res?.data.groups) {
      if (item.channel) {
        newArray.push(item);
      }
    }
    console.log(newArray);
    dispatch(getChannels(newArray));
  } catch (error) {
    return error.response.data;
  }
};

export const updateGroupChannel = async (
  grId,
  token,
  data,
  dispatch,
  axiosJWT
) => {
  try {
    await axiosJWT.post(`/pkg-mgmt/gr/${grId}/channel`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    await getGroupByUserId(token, dispatch, axiosJWT);

    await getGroupChannel(token, dispatch, axiosJWT);
  } catch (error) {
    return error.response.data;
  }
};

export const postPackageBill = async (
  group_id,
  data,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.post(`/pkg-mgmt/bill/${group_id}`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data.statusCode === 201) {
      await getGroupByUserId(token, dispatch, axiosJWT);
      dispatch(updateGroupId(group_id));
      dispatch(updateGroupItemId(2));
    }
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateStatusBill = async (id, data, token, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.put(`/pkg-mgmt/bill/${id}/status`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    await getGroupByUserId(token, dispatch, axiosJWT);
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deletePackageBill = async (
  group_id,
  id,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    const res = await axiosJWT.delete(`/pkg-mgmt/bill/${id}`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data.statusCode === 200) {
      await getGroupByUserId(token, dispatch, axiosJWT);
      dispatch(updateGroupId(group_id));
      dispatch(updateGroupItemId(2));
    }
    return res?.data;
  } catch (error) {
    dispatch(updateGroupId(group_id));
    dispatch(updateGroupItemId(2));
    return error.response.data;
  }
};

export const updatePackageBill = async (
  group_id,
  id,
  dataAmount,
  checkAmount,
  dataStatus,
  checkStatus,
  token,
  dispatch,
  axiosJWT
) => {
  try {
    if (checkAmount) {
      await axiosJWT.put(`/pkg-mgmt/bill/${id}`, dataAmount, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (checkStatus) {
      await axiosJWT.put(`/pkg-mgmt/bill/${id}/status/lender`, dataStatus, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
    }

    await getGroupByUserId(token, dispatch, axiosJWT);
    dispatch(updateGroupId(group_id));
    dispatch(updateGroupItemId(2));

    return true;
  } catch (error) {
    dispatch(updateGroupId(group_id));
    dispatch(updateGroupItemId(2));
    return false;
  }
};

export const postDoubleCheck = async (id, data, token, axiosJWT) => {
  try {
    await axiosJWT.post(`/pkg-mgmt/bill/${id}/send_request`, data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    })
    return true;
  } catch (error) {
    return false;
  }
}

export const uploadFileImage = async (data, token, axiosJWT) => {
  try {
    console.log("vyyyy");
    const res = await axiosJWT.post("/file/upload-and-get-url", data, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("vyyy 1");
    return res?.data;
  } catch (error) {
    return error.response.data;
  }
};
