import React, { useEffect, useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import "../../assets/css/Home.scss";
import BoxGroup from "./BoxGroup";
import BoxNotification from "./BoxNotification";
import BoxTodos from "./BoxTodos";
import BoxTransaction from "./BoxTransaction";
import * as CustomComponent from "../../component/custom/CustomComponents";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomeLayout() {
  const navigate = useNavigate();
  const homeTodos = useSelector((state) => state?.home.homeTodos);
  const homeBilling = useSelector((state) => state?.home.homeBilling);
  const homeChat = useSelector((state) => state?.home.homeChat);
  const homeTrans = useSelector((state) => state?.home.homeTrans);
  const homeGroup = useSelector((state) => state?.home.homeGroup);

  const [widthContent, setWidthContent] = useState(window.innerWidth);

  useEffect(() => {
    function handleWindowResize() {
      setWidthContent(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handlePagePackage = () => {
    navigate("/package");
  };
  return (
    <>
      {homeGroup.length > 0 ? (
        <Box className="home-box">
          <Stack
            sx={{
              width: homeBilling.length <= 0 ? "100%" : "70%",
              m: 1,
              display:
                widthContent < 600 && homeBilling.length > 0 ? "none" : "block",
            }}
            spacing={3}
          >
            <BoxGroup />

            <BoxTransaction
              className="home-box-3-trans"
              homeChat={homeChat}
              homeTrans={homeTrans}
            />

            {homeTodos.length > 0 ? (
              <BoxTodos
                className="home-box-3-todos"
                homeTodos={homeTodos}
                widthContent={widthContent}
              />
            ) : null}
          </Stack>

          <Stack
            sx={{
              width: widthContent < 600 ? "100%" : "30%",
              display: homeBilling.length > 0 ? "block" : "none",
              m: 1,
            }}
            spacing={2}
          >
            {homeBilling.length > 0 &&
              homeBilling.map((bill, idx) =>
                bill && idx < 5 ? (
                  <BoxNotification
                    bill={bill}
                    homeBilling={homeBilling}
                    key={idx}
                  />
                ) : null
              )}
          </Stack>
        </Box>
      ) : (
        <Box className="home-image">
          <Box className="home-go-package">
            <Typography>Bạn chưa tham gia gói quản lý nào</Typography>
            <CustomComponent.Button1 className="btn-btn" onClick={handlePagePackage}>
              Mua ngay
            </CustomComponent.Button1>
          </Box>
        </Box>
      )}
    </>
  );
}

export default HomeLayout;
