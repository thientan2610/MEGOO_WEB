import React, { useState } from "react";

import {
  Stack,
  Breadcrumbs,
  Link,
  Typography,
  Box,
  Modal,
  Tooltip,
} from "@mui/material";

import { createAxios } from "../../http/createInstance";

import { Colors } from "../../config/Colors";
import ListItemProduct from "./ListItemProduct.js";
import AddProduct from "./AddProduct";
import CreateProduct from "./CreateProduct";
import { useDispatch, useSelector } from "react-redux";
import AddAddress from "./AddAddress";
import * as CustomComponent from "../../component/custom/CustomComponents";
import AddIcon from "@mui/icons-material/Add";
import "../../assets/css/Product.scss";
import { loginSuccess } from "../../redux/authSlice";
import { getProductItemsByStorage } from "../../redux/stockRequest";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "60%", lg: "50%" },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function ProductItem({ grId, storageID }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const listProducts = useSelector((state) => state?.stock?.listProduct.data);
  const metaProducts = useSelector((state) => state?.stock?.listProduct.meta);

  const [openAdd, setOpenAdd] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [stateBtn, setStateBtn] = useState(1);
  const [nowDate, setNowDate] = useState("");

  const handleOpen = () => {
    if (listProducts.length > 0) {
      setOpenAdd(true);
    } else {
      setOpenCreate(true);
    }
  };

  const handleOpenAdd = () => {
    setOpenCreate(false);
    setOpenAdd(true);
  };

  const handleCreatePro = () => {
    setOpenAdd(false);
    setOpenCreate(true);
  };

  const handleAddress = () => {
    setOpenAddress(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseCreatePro = () => setOpenCreate(false);
  const handleCloseAddress = () => setOpenAddress(false);

  const handleListProduct = async (e, state) => {
    let d = "";
    if (state === 2) {
      let date = new Date();
      let m = date.getMonth() + 1;
      d = date.getFullYear() + "-" + m + "-" + date.getDate();
      setNowDate(d);
    }
    const res = await getProductItemsByStorage(
      grId,
      1,
      5,
      storageID,
      state,
      d,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    if (res) {
      setStateBtn(state);
    }
  };

  return (
    <Stack
      spacing={3}
      sx={{
        paddingX: { xs: "2%", md: "5%" },
        width: "100%",
        paddingY: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumbs>
          <Link underline="hover" color={Colors.textPrimary} href="/">
            Trang chủ
          </Link>
          <Link underline="hover" color={Colors.textPrimary} href="/stock">
            Kho lưu trữ
          </Link>
          <Typography color="text.primary"> Nhu yếu phẩm trong kho </Typography>
        </Breadcrumbs>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <CustomComponent.Button1 onClick={handleOpen}>
            <AddIcon color={Colors.background} />
            Thêm nhu yếu phẩm
          </CustomComponent.Button1>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Tooltip title="Thêm nhu yếu phẩm">
            <CustomComponent.Button1 onClick={handleOpen}>
              <AddIcon color={Colors.background} />
            </CustomComponent.Button1>
          </Tooltip>
        </Box>
        {/* <IconButton onClick={handleOpen}>
          <MdOutlineAddBox color={Colors.textPrimary} size={30} />
        </IconButton> */}
      </Box>
      <Box className="box-btn-select-product">
        {stateBtn === 1 ? (
          <CustomComponent.Button3 className="btn-btn">
            Tất cả
          </CustomComponent.Button3>
        ) : (
          <CustomComponent.Button4
            className="btn-btn"
            onClick={(e) => handleListProduct(e, 1)}
          >
            Tất cả
          </CustomComponent.Button4>
        )}
        {stateBtn === 2 ? (
          <CustomComponent.Button3 className="btn-btn">
            Hết hạn
          </CustomComponent.Button3>
        ) : (
          <CustomComponent.Button4
            className="btn-btn"
            onClick={(e) => handleListProduct(e, 2)}
          >
            Hết hạn
          </CustomComponent.Button4>
        )}
        {stateBtn === 3 ? (
          <CustomComponent.Button3 className="btn-btn">
            Sắp hết
          </CustomComponent.Button3>
        ) : (
          <CustomComponent.Button4
            className="btn-btn"
            onClick={(e) => handleListProduct(e, 3)}
          >
            Sắp hết
          </CustomComponent.Button4>
        )}
      </Box>
      <Box className="box-btn-select-product">
        {listProducts?.length <= 0 && (
          <>
            <Typography sx={{ color: Colors.purpleGray}}>Danh sách nhu yếu phẩm rỗng</Typography>
          </>
        )}
      </Box>
      {listProducts?.length > 0 ? (
        <ListItemProduct
          item={listProducts}
          p={metaProducts}
          grId={grId}
          storageID={storageID}
          state={stateBtn}
          date={nowDate}
        />
      ) : null}
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-add-product"
        aria-describedby="modal-modal-product"
      >
        <Box sx={style}>
          <AddProduct
            grId={grId}
            storageID={storageID}
            handleCreatePro={handleCreatePro}
            handleAddAddress={handleAddress}
            handleCloseAdd={handleCloseAdd}
          />
        </Box>
      </Modal>

      <Modal
        open={openCreate}
        onClose={handleCloseCreatePro}
        aria-labelledby="modal-modal-creat-product"
        aria-describedby="modal-modal-product"
      >
        <Box sx={style}>
          <CreateProduct
            grId={grId}
            storageID={storageID}
            handleAddAddress={handleAddress}
            handleOpenAdd={handleOpenAdd}
            handleCloseCreatePro={handleCloseCreatePro}
          />
        </Box>
      </Modal>

      <Modal
        open={openAddress}
        onClose={handleCloseAddress}
        aria-labelledby="modal-modal-add-address"
        aria-describedby="modal-modal-address"
      >
        <Box sx={style}>
          <AddAddress grID={grId} handleCloseAddress={handleCloseAddress} />
        </Box>
      </Modal>
    </Stack>
  );
}

export default ProductItem;
