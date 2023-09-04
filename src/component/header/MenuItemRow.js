import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IconButton, Tooltip, Badge } from "@mui/material";

import configRoutes from "../../config/routes.js";
import { privateRoutes } from "../../routes/index.js";
import { getAllPackage } from "../../redux/packageRequest.js";

function MenuItemRow({ item, user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const numberCart = useSelector((state) => state?.package.numberCart);

  const [path, setPath] = useState(window.location.pathname);

  const handleButtonHeader = () => {
    if (item.title === "Package") {
      getAllPackage(dispatch);
    }
    setPath(window.location.pathname);
  };

  useEffect(() => {
    if ((user === null) & (path === "/")) {
      navigate("/package");
    }
  }, [navigate, path, user]);
  return (
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
          invisible={item.name === "Shopping" && user ? false : true}
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
  );
}

export default MenuItemRow;
