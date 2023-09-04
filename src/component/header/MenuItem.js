import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IconButton, Grid, Tooltip, Badge } from "@mui/material";

import configRoutes from "../../config/routes.js";
import { privateRoutes } from "../../routes/index.js";
import { getAllPackage } from "../../redux/packageRequest.js";

function MenuItem({ item, user }) {
  const dispatch = useDispatch();

  const numberCart = useSelector((state) => state?.package.numberCart);

  const [path, setPath] = useState(window.location.pathname)

  const handleButtonHeader = () => {
    if (item.title === "Package") {
      getAllPackage(dispatch);
    }
    setPath(window.location.pathname);
  };
  return (
    <Grid>
      <Tooltip title={item.title}>
        <IconButton
          type="button"
          sx={{
            alignItems: "center",
          }}
          onClick={handleButtonHeader}
        >
          <Badge
            badgeContent={numberCart}
            color="primary"
            invisible={item.title === "Shopping" ? false : true}
          >
            {privateRoutes.map(({ path }) => path).includes(item.route) ? (
              <NavLink to={user ? item.route : configRoutes.login}>
                {path === item.route ? item.iconFill : item.iconOutline}
              </NavLink>
            ) : (
              <NavLink to={item.route}>
                {path === item.route ? item.iconFill : item.iconOutline}
              </NavLink>
            )}
          </Badge>
        </IconButton>
      </Tooltip>
    </Grid>
  );
}

export default MenuItem;
