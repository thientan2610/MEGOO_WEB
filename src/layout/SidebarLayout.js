import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  Stack,
  Box,
  Snackbar,
  Alert,
  Drawer,
  CircularProgress,
} from "@mui/material";

import HeaderComponent from "../component/header/Header";
import SideBarComponent from "../component/sidebar/Sidebar";
import FooterComponent from "../component/footer/Footer";

import { Colors } from "../config/Colors";
import "../assets/css/Content.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateOpenSnackbar } from "../redux/messageSlice";
import { toggleShowSidebar } from "../redux/packageSlice";

const drawerWidth = 300;

function SidebarLayout({ data, title, selectedID, children }) {
  const dispatch = useDispatch();
  const refHeader = useRef(null);
  const refFooter = useRef(null);

  const [heightHeader, setHeightHeader] = useState(0);
  const [heightFooter, setHeightFooter] = useState(0);
  const [widthContent, setWidthContent] = useState(window.innerWidth);
  const [widthProgress, setWidthProgress] = useState(window.innerWidth / 2);
  const [heightProgress, setHeightProgress] = useState(window.innerHeight / 2);

  const showSidebar = useSelector((state) => state?.package?.showSidebar);
  const isProgress = useSelector((state) => state?.message.isProgress);
  const openSnackbar = useSelector((state) => state?.message.flag);
  const statusSnackbar = useSelector((state) => state?.message.status);
  const msgSnackbar = useSelector((state) => state?.message.msg);

  const handleCloseDrawer = () => {
    dispatch(toggleShowSidebar());
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(updateOpenSnackbar(false));
  };

  useEffect(() => {
    function handleWindowResize() {
      setWidthContent(window.innerWidth);
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
          flexDirection: "row",
          justifyContent: { sm: "center", md: "space-between" },
          // justifyContent: "center",
          alignItems: "stretch",
          opacity: isProgress ? 0.35 : 1,
        }}
      >
        <Box
          bgcolor={Colors.background}
          sx={{
            display: { xs: showSidebar ? "flex" : "none", md: "flex" },
            //width: { xs: "80%", sm: "300px", lg: "350px"},
            //width: "300px",
          }}
        >
          {widthContent < 900 ? (
            <Drawer
              anchor={"left"}
              open={showSidebar}
              onClose={handleCloseDrawer}
              sx={{
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              <SideBarComponent
                data={data}
                title={title}
                selectedID={selectedID}
              />
            </Drawer>
          ) : (
            <SideBarComponent
              data={data}
              title={title}
              selectedID={selectedID}
            />
          )}
        </Box>

        <Box
          sx={{
            //display: { xs: showSidebar ? "none" : "flex", md: "flex" },
            //width: `calc(100vw - ${widthContent}px - 30px)`,
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
            paddingX: { xs: "2%", lg: "5%" },
            backgroundColor: Colors.bgGray,
          }}
          paddingY={5}
        >
          {children}
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openSnackbar}
            autoHideDuration={500}
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
      </Box>

      <Box ref={refFooter} zIndex={1} sx={{ opacity: isProgress ? 0.35 : 1 }}>
        <FooterComponent />
      </Box>
    </Stack>
  );
}

export default SidebarLayout;
