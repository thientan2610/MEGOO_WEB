import React from "react";
import { Drawer, List } from "@mui/material";

import SidebarItemCollapse from "./SidebarItemCollapse.js";
import SidebarItem from "./SidebarItem.js";

function SideBar({ data, title, selectedID }) {
  const dataSidebar = data;

  return (
    <List
      sx={{
        width: "300px",
        marginY: "7%",
      }}
    >
      {dataSidebar.map((route, index) =>
        route ? (
          route.child ? (
            <SidebarItemCollapse
              item={route}
              key={index}
              title={title}
              selectedID={selectedID}
            />
          ) : (
            <SidebarItem
              item={route}
              key={index}
              title={title}
              selectedID={selectedID}
            />
          )
        ) : null
      )}
    </List>
  );
}

export default SideBar;
