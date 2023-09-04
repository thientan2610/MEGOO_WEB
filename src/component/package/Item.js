import React from "react";
import { useSelector } from "react-redux";
import { Stack, Box, Typography } from "@mui/material";

import { Colors } from "../../config/Colors";
import * as CustomComponents from "../custom/CustomComponents.js";
import "../../assets/css/Content.scss";
import DetailItem from "./DetailItem.js";

function Item() {
  const selectedPackage = useSelector((state) => state?.package?.packageID);
  const dataPackage = useSelector((state) => state?.package?.package);

  return (
    <Stack>
      {dataPackage[0].child.map((route, index) =>
        route ? (
          route._id === selectedPackage ? (
            <DetailItem item={route} key={route._id} />
          ) : null
        ) : null
      )}
    </Stack>
  );
}

export default Item;
