import React, { useState } from "react";
import { Box, Modal, Stack, Tooltip, Typography } from "@mui/material";
import { MdOutlineInventory2 } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import ImageStock from "./ImageStock";

import { Colors } from "../../config/Colors";
import "../../assets/css/Stock.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import ModalAddStock from "./ModalAddStock";
import { useNavigate } from "react-router-dom";
import { getAllProductInStock } from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../http/createInstance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function StockItem({ item, grID }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleListProduct = async () => {
    const res = await getAllProductInStock(
      grID,
      1,
      10,
      1,
      null,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    if (res) {
      navigate(`/stock/list-product?grId=${grID}`);
    }
  };

  return (
    <Stack spacing={3} sx={{ marginX: "5%" }}>
      <Box className="title-stock" sx={{ justifyContent: "space-between" }}>
        <Box className="title-stock">
          <MdOutlineInventory2 color={Colors.textPrimary} size={50} />
          <Typography variant="h6" color={Colors.textPrimary} fontSize={22}>
            Nơi lưu trữ
          </Typography>
        </Box>
        <Box className="title-stock">
          {item.length > 0 ? (
            <>
              <CustomComponent.Button3
                className="btn-btn"
                sx={{ display: { xs: "none", sm: "flex" }, width: "148px" }}
                onClick={handleListProduct}
              >
                <MenuIcon color={Colors.background} />
                Nhu yếu phẩm
              </CustomComponent.Button3>
              <Tooltip title="Danh sách nhu yếu phẩm">
                <CustomComponent.Button3
                  className="btn-btn"
                  sx={{ display: { xs: "flex", sm: "none" }, width: "30px" }}
                  onClick={handleListProduct}
                >
                  <MenuIcon color={Colors.background} />
                </CustomComponent.Button3>
              </Tooltip>{" "}
            </>
          ) : null}
          <CustomComponent.Button1
            className="btn-btn"
            sx={{ display: { xs: "none", sm: "flex" }, width: "148px" }}
            onClick={handleOpen}
          >
            <AddIcon color={Colors.background} />
            Thêm kho
          </CustomComponent.Button1>
          <Tooltip title="Thêm kho lưu trữ">
            <CustomComponent.Button1
              className="btn-btn"
              sx={{ display: { xs: "flex", sm: "none" }, width: "30px" }}
              onClick={handleOpen}
            >
              <AddIcon color={Colors.background} />
            </CustomComponent.Button1>
          </Tooltip>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <ModalAddStock grID={grID} handleClose={handleClose} />
            </Box>
          </Modal>
        </Box>
      </Box>

      {item.length > 0 ? <ImageStock item={item} grID={grID} /> : null}
    </Stack>
  );
}

export default StockItem;
