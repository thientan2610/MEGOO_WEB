import React, { useState, useEffect, useRef } from "react";
import { Stack, Box, Snackbar, Alert, CircularProgress } from "@mui/material";

import HeaderComponent from "../component/header/Header";
import FooterComponent from "../component/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateOpenSnackbar } from "../redux/messageSlice";
import { Colors } from "../config/Colors";

function DefaultLayout({ children }) {
  const dispatch = useDispatch();
  const refHeader = useRef(null);
  const refFooter = useRef(null);

  const [widthProgress, setWidthProgress] = useState(window.innerWidth / 2);
  const [heightProgress, setHeightProgress] = useState(window.innerHeight / 2);

  const isProgress = useSelector((state) => state?.message.isProgress);
  const openSnackbar = useSelector((state) => state?.message.flag);
  const statusSnackbar = useSelector((state) => state?.message.status);
  const msgSnackbar = useSelector((state) => state?.message.msg);



  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(updateOpenSnackbar(false));
  };

  const [heightHeader, setHeightHeader] = useState(0);
  const [heightFooter, setHeightFooter] = useState(0);

  useEffect(() => {
    function handleWindowResize() {
      setWidthProgress(window.innerWidth / 2);
      setHeightProgress(window.innerHeight / 2);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);


  useEffect(() => {
    setHeightHeader(refHeader.current.offsetHeight);
    setHeightFooter(refFooter.current.offsetHeight);
  }, []);

  return (
    <Stack sx={{ position: "relative" }}>
      {isProgress && (
        <Box
          sx={{
            position: "absolute",
            left: `${widthProgress}px`,
            top: `${heightProgress}px`,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Box ref={refHeader} zIndex={1} sx={{ opacity: isProgress ? 0.35 : 1 }}>
        <HeaderComponent />
      </Box>
      <Box
        sx={{
          minHeight: `calc(100vh - ${heightHeader}px - ${heightFooter}px)`,
          display: "flex",
          backgroundColor: Colors.bgGray,
          opacity: isProgress ? 0.35 : 1
        }}
      >
        {children}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={statusSnackbar ? "success" : "error"}
            sx={{
              width: "100%",
              height: "50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {msgSnackbar}
          </Alert>
        </Snackbar>
      </Box>
      <Box ref={refFooter} zIndex={1} sx={{ opacity: isProgress ? 0.35 : 1 }}>
        <FooterComponent />
      </Box>
    </Stack>
  );
}

export default DefaultLayout;
