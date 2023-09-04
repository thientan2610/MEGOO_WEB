import React from "react";
import { Box, Typography } from "@mui/material";
import SuperUser from "./SuperUser";
import SidebarLayout from "../../layout/SidebarLayout";
import DefaultLayout from "../../layout/DefaultLayout.js";
import { useSelector } from "react-redux";
import GroupSpending from "./Bill/GroupSpending";

// import { loginSuccess } from "../../redux/authSlice";
// import { createAxios } from "../../http/createInstance";
// import { updateGroupId, updateGroupItemId } from "../../redux/userSlice";
import GroupTodos from "./Todos/GroupTodos";
import GroupTasks from "./Tasks/GroupTasks";
import HomeLayoutNoGroup from "../Home/HomeLayoutNoGroup";
import GroupFunding from "./Funding/GroupFunding";

function GroupItem() {
  // const dispatch = useDispatch();

  // const user = useSelector((state) => state?.auth.login?.currentUser);
  const groups = useSelector((state) => state?.user?.groupAll);
  const selectedID = useSelector((state) => state?.user?.groupID);
  const selectedItemID = useSelector((state) => state?.user?.groupItemID);

  // let axiosJWT = createAxios(user, dispatch, loginSuccess);

  // const searchParams = new URLSearchParams(document.location.search);
  // dispatch(updateGroupId(searchParams.get("groupId")));
  // dispatch(updateGroupItemId(parseInt(searchParams.get("Id"))));

  return (
    <>
      {selectedID === 0 ? (
        <HomeLayoutNoGroup msg="Hiện bạn chưa có nhóm nào" />
      ) : (
        <SidebarLayout data={groups} title="group" selectedID={selectedItemID}>
          {groups.map((gr) =>
            gr
              ? gr.child.map((route) =>
                  route ? (
                    route._id === selectedID ? (
                      selectedItemID === 0 ? (
                        <SuperUser
                          item={route.child[0].group}
                          key={route._id}
                          title={gr.name}
                        />
                      ) : selectedItemID === 1 ? (
                        <GroupFunding
                          item={route.child[1].group}
                          title={gr.name}
                          key={route._id}
                        />
                      ) : selectedItemID === 2 ? (
                        <GroupSpending
                          item={route.child[2].group}
                          key={route._id}
                        />
                      ) : selectedItemID === 3 ? (
                        <GroupTodos
                          key={route._id}
                          grId={route._id}
                          item={route.child[3].group}
                        />
                      ) : (
                        <GroupTasks
                          key={route._id}
                          grId={route._id}
                          item={route.child[4].group}
                        />
                      )
                    ) : null
                  ) : null
                )
              : null
          )}
        </SidebarLayout>
      )}
    </>
  );
}

export default GroupItem;
