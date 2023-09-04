import React from "react";
import { Stack, Typography } from "@mui/material";

function Noti({ title, describe }) {
  return (
    <Stack direction="column" justifyContent="center" alignItems="flex-start" paddingLeft={'5px'} >
      <Typography variant="button" fontSize={"15px"} gutterBottom >
        {title}
      </Typography>
      <Typography variant="body2" fontSize={"10px"} gutterBottom >
        {describe.toLowerCase()}
      </Typography>
    </Stack>
  );
}

export default Noti;
