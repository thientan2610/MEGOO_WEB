import React, { useEffect, useRef, useState } from "react";

import {
  Autocomplete,
  Box,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { FaBarcode } from "react-icons/fa";

import { createAxios } from "../../http/createInstance";

import { Colors } from "../../config/Colors";
import "../../assets/css/Product.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import * as FormatNumber from "../../component/custom/FormatDateNumber";
import DateTimePicker from "../../component/Date/DateTimePicker";
import {
  deletedProductItem,
  searchStorageLocation,
  updateGroupProduct,
  updateImgGroupProduct,
  updateItems,
} from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import {
  updateMessage,
  updateOpenSnackbar,
  updateProgress,
  updateStatus,
} from "../../redux/messageSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "15px",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function ItemDetail({ item, grId }) {
  const inputRef = useRef();
  const avatarRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const purchaseLocation = () => {
    let addr =
      item?.purchaseLocation.address.addressLine1 +
      ", " +
      item?.purchaseLocation.address.wardName +
      ", " +
      item?.purchaseLocation.address.districtName +
      ", " +
      item?.purchaseLocation.address.provinceName;
    return addr;
  };

  const initalData = {
    name: item?.groupProduct.name,
    barcode: item?.groupProduct.barcode,
    quantity: item?.quantity,
    money: item?.groupProduct.price ?? 0,
    exp: item?.bestBefore,
    storage: item?.storageLocation.name,
  };

  const addressPur = purchaseLocation();
  const [image, setImage] = useState(item?.image);
  const [name, setName] = useState(item?.groupProduct.name);
  const [barcode, setBarcode] = useState(item?.groupProduct.barcode);
  const [quantity, setQuantity] = useState(item?.quantity);
  const [money, setMoney] = useState(FormatNumber.formatCurrency(item?.groupProduct.price ?? 0));
  const [expDate, setExpDate] = useState(item?.bestBefore);
  const [storage, setStorage] = useState(item?.storageLocation.name);
  const [inputStorage, setInputStorage] = useState("");
  const [listStorage, setListStorage] = useState([]);
  const [idStorage, setIdStorage] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    dispatch(updateProgress(true));
    let formData = {
      file: fileObj,
    };

    const res = await updateImgGroupProduct(
      grId,
      item?.groupProduct.id,
      item?.id,
      formData,
      user?.accessToken,
      dispatch,
      axiosJWT
    );

    if (res != null) {
      dispatch(updateProgress(false));
      if (res?.statusCode === 200) {
        setImage(res?.data.image);
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Cập nhật hình ảnh nhu yếu phẩm thành công"));
      } else {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Cập nhật hình ảnh nhu yếu phẩm thất bại"));
      }
    }
  };

  const handleDateTimePicker = (dateValue) => {
    setExpDate(dateValue.$d);
  };

  const searchDataStorageLocation = async (search) => {
    const res = await searchStorageLocation(
      grId,
      search,
      user?.accessToken,
      axiosJWT
    );

    if (res?.statusCode === 200) {
      setListStorage(res?.data);
    }
  };

  const handleChangeInputStorage = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataStorageLocation(character);
    }, 300);
    setInputStorage(character);
  };

  const handleSelectedStorage = (e, op) => {
    if (op != null) {
      setIdStorage(op.id);
    }
  };

  // const handleSaveMoney = (value) => {
  //   console.log(FormatNumber.formatCurrency(value));
  //   //FormatNumber.formatCurrency(FormatNumber)
  //   setMoney(FormatNumber.formatCurrency(value));
  // }

  const handleChangeProduct = async () => {
    let checkGP = false;
    let checkItem = false;
    if (
      barcode !== initalData.barcode ||
      name !== initalData.name ||
      money !== initalData.money
    ) {
      checkGP = true;
    }

    if (
      quantity !== initalData.quantity ||
      expDate !== initalData.exp ||
      storage !== initalData.storage
    ) {
      checkItem = true;
    }

    if (checkGP === false && checkItem === false) {
      return;
    }
    dispatch(updateProgress(true));
    let formData1 = {
      name: name,
      barcode: barcode,
      price: money,
    };
    let formData2 = {
      bestBefore: expDate,
      quantity: quantity,
    };
    if (checkGP === true && checkItem === true) {
      const resGP = await updateGroupProduct(
        grId,
        item?.groupProduct.id,
        item?.id,
        formData1,
        user?.accessToken,
        dispatch,
        axiosJWT
      );
      if (resGP === false) {
        dispatch(updateProgress(false));
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Cập nhật thông tin nhu yếu phẩm thất bại!"));
      } else {
        const resItems = await updateItems(
          grId,
          item?.id,
          formData2,
          user?.accessToken,
          dispatch,
          axiosJWT
        );
        if (resItems === false) {
          dispatch(updateProgress(false));
          dispatch(updateOpenSnackbar(true));
          dispatch(updateStatus(false));
          dispatch(updateMessage("Cập nhật thông tin nhu yếu phẩm thất bại!"));
        } else {
          dispatch(updateProgress(false));
          dispatch(updateOpenSnackbar(true));
          dispatch(updateStatus(true));
          dispatch(
            updateMessage("Cập nhật thông tin nhu yếu phẩm thành công!")
          );
        }
      }
    } else if (checkGP) {
      const resGP = await updateGroupProduct(
        grId,
        item?.groupProduct.id,
        item?.id,
        formData1,
        user?.accessToken,
        dispatch,
        axiosJWT
      );
      if (resGP) {
        dispatch(updateProgress(false));
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Cập nhật thông tin nhu yếu phẩm thành công!"));
      } else {
        dispatch(updateProgress(false));
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Cập nhật thông tin nhu yếu phẩm thất bại!"));
      }
    } else {
      const resItems = await updateItems(
        grId,
        item?.id,
        formData2,
        user?.accessToken,
        dispatch,
        axiosJWT
      );
      if (resItems === false) {
        dispatch(updateProgress(false));
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Cập nhật thông tin nhu yếu phẩm thất bại!"));
      } else {
        dispatch(updateProgress(false));
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Cập nhật thông tin nhu yếu phẩm thành công!"));
      }
    }
  };

  const handleDeleteItem = async () => {
    handleCloseModal();
    dispatch(updateProgress(true));
    const res = await deletedProductItem(
      grId,
      item?.id,
      user?.accessToken,
      axiosJWT
    );
    if (res) {
      dispatch(updateProgress(false));
      navigate(
        `/stock/product-stock?grId=${grId}&storageId=${item?.storageLocation.id}`
      );
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(true));
      dispatch(updateMessage("Xóa nhu yếu phẩm thành công!"));
      
    } else {
      dispatch(updateProgress(false));
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(false));
      dispatch(updateMessage("Xóa nhu yếu phẩm thất bại!"));
    }
  };

  return (
    <Stack sx={{ marginBottom: "3% !important" }} spacing={1}>
      <Typography variant="h6" gutterBottom sx={{ color: Colors.textPrimary }}>
        Thông tin chi tiết của nhu yếu phẩm
      </Typography>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "flex-start" },
          width: "100%",
          backgroundColor: Colors.bgGray,
        }}
        spacing={2}
      >
        <Box
          className="box-img-product"
          sx={{
            width: { xs: "100%", sm: "80%", md: "30%" },
            height: "calc(100% - 40px)",
          }}
        >
          <Box paddingX={"10px"} align={"center"} ref={avatarRef}>
            <CustomComponent.ButtonProduct onClick={handleClick}>
              <CustomComponent.ImageSrcProduct
                style={{ backgroundImage: `url(${image})` }}
              />
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <CustomComponent.ImageBackdrop className="MuiImageBackdrop-root" />
              <CustomComponent.ImageProduct>
                <Box
                  bgcolor={Colors.camera}
                  borderRadius={"50%"}
                  padding={"8px"}
                >
                  <ModeEditIcon color={Colors.black} size={25} />
                </Box>
              </CustomComponent.ImageProduct>
            </CustomComponent.ButtonProduct>
          </Box>
          <Box
            sx={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              label={"barcode"}
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaBarcode />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Stack
          className="box-img-product"
          sx={{
            width: { xs: "100%", sm: "80%", md: "70%" },
            height: "calc(100% - 40px)",
          }}
          spacing={2}
        >
          <Box sx={{ width: { xs: "90%", sm: "80%", md: "100%", lg: "80%" } }}>
            <Typography>Tên sản phẩm</Typography>
            <TextField
              multiline
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: { xs: "90%", sm: "80%", md: "100%", lg: "80%" },
            }}
          >
            <Box sx={{ mr: 1, mt: 1, mb: 1 }}>
              <Typography>Số lượng</Typography>
              <TextField
                id="outlined-start-adornment-quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 1,
                  step: 1,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{item?.unit}</InputAdornment>
                  ),
                }}
                sx={{ width: "130px" }}
              />
            </Box>
            <Box sx={{ m: 1 }}>
              <Typography>Giá tiền</Typography>
              <TextField
                id="outlined-start-adornment-money"
                type="number"
                value={money}
                onChange={(e) => setMoney(e.target.value)}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 1000,
                  step: 1000,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">vnd</InputAdornment>
                  ),
                }}
                sx={{ width: "150px" }}
              />
            </Box>
            <Box sx={{ ml: 1, mt: 1, mb: 1, width: "100%" }}>
              <Typography>Ngày hết hạn</Typography>
              <DateTimePicker
                valueDay={expDate}
                handleDateTimePicker={handleDateTimePicker}
                sizeDateTime={"medium"}
              />
            </Box>
          </Box>
          <Box sx={{ width: { xs: "90%", sm: "80%", md: "100%", lg: "80%" } }}>
            <Typography>Vị trí lưu trữ</Typography>
            <Autocomplete
              id="free-solo-storage"
              freeSolo
              fullWidth
              options={listStorage}
              getOptionLabel={(option) => option.name}
              onChange={(e, op) => handleSelectedStorage(e, op)}
              inputValue={storage}
              onInputChange={(event, newInputValue) => {
                setStorage(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={inputStorage}
                  onChange={handleChangeInputStorage}
                  placeholder="Chọn vị trí"
                />
              )}
            />
          </Box>
          <Box className="box-address">
            <LocationOnIcon />
            <Typography>{addressPur}</Typography>
          </Box>
          <Box
            sx={{
              width: { xs: "90%", sm: "80%", md: "100%", lg: "80%" },
              display: "flex",
              justifyContent: "flex-end",
              height: "max-content",
            }}
          >
            <CustomComponent.Button2
              onClick={handleOpenModal}
              sx={{ width: "160px", height: "100%", m: 1 }}
            >
              Xóa nhu yếu phẩm
            </CustomComponent.Button2>
            <CustomComponent.Button1
              onClick={handleChangeProduct}
              sx={{ width: "160px", height: "100%", m: 1 }}
            >
              Lưu thay đổi
            </CustomComponent.Button1>
          </Box>
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={style}>
              <Typography>Bạn có muốn xóa chi tiêu này không?</Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CustomComponent.Button1
                  sx={{ width: "40px", marginRight: "10px" }}
                  onClick={handleDeleteItem}
                >
                  Có
                </CustomComponent.Button1>
                <CustomComponent.Button2
                  sx={{ width: "40px", marginLeft: "10px" }}
                  onClick={handleCloseModal}
                >
                  Không
                </CustomComponent.Button2>
              </Box>
            </Box>
          </Modal>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ItemDetail;
