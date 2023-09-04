import React, { useState } from "react";

import {
  Box,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import { createAxios } from "../../http/createInstance";

import {
  addItemsToStorage,
  searchGroupProducts,
  searchPurchaseLocations,
} from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Product.scss";
import "../../assets/css/Autocomplete.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";
import { Colors } from "../../config/Colors";
import { updateMessage, updateOpenSnackbar, updateProgress, updateStatus } from "../../redux/messageSlice";

function AddProduct({ grId, storageID, handleCreatePro, handleAddAddress, handleCloseAdd }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const nowDate = new Date();
  const [prod, setProd] = useState(null);
  const [addr, setAddr] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState(nowDate);

  const [inputProduct, setInputProduct] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [products, setProducts] = useState([]);
  const [listAddress, setListAdrress] = useState([]);

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const searchDataGroupProducts = async (search) => {
    const res = await searchGroupProducts(
      search,
      grId,
      user?.accessToken,
      axiosJWT
    );
    setProducts(res);
  };

  const handleChangeInputProduct = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataGroupProducts(character);
    }, 200);
    setInputProduct(character);
  };

  const searchDataPurchaseLocations = async (search) => {
    const res = await searchPurchaseLocations(
      search,
      grId,
      user?.accessToken,
      axiosJWT
    );
    let arr = [];
    for (let el of res) {
      let formData = {
        id: el.id,
        name:
          el.name +
          ", " +
          el.address.addressLine1 +
          ", " +
          el.address.wardName +
          ", " +
          el.address.districtName +
          ", " +
          el.address.provinceName,
      };
      arr.push(formData);
    }
    setListAdrress(arr);
  };

  const handleChangeInputAddress = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataPurchaseLocations(character);
    }, 200);
    setInputAddress(character);
  };

  const handleSelectedAddress = (e, op) => {
    if (op) {
      setAddr(op.id);
    } else {
      setAddr(null);
    }
  };

  const handleSelectedProduct = (e, op) => {
    if (op) {
      setProd(op.id);
    } else {
      setProd(null);
    }
  };

  const handleAddProd = async () => {
    let formData = {
      addedBy: user?.data.userInfo._id,
      bestBefore: date,
      quantity: quantity,
      unit: unit,
      groupProductId: prod,
      storageLocationId: storageID,
      purchaseLocationId: addr,
    };
    handleCloseAdd();
    dispatch(updateProgress(true));
    const res = await addItemsToStorage(
      grId,
      storageID,
      formData,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    if (res != null) {
      dispatch(updateProgress(false));
      if (res?.statusCode === 201) {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Thêm nhu yếu phẩm vào kho lưu trữ thành công!"));
      } else {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Thêm nhu yếu phẩm vào kho lưu trữ thất bại!"));
      }
    }
  };

  return (
    <Stack
      spacing={2}
      id="idAddProduct"
      className="addAddProduct"
      sx={{ position: "relative" }}
    >
      <Autocomplete
        id="free-solo-product"
        freeSolo
        fullWidth
        options={products}
        getOptionLabel={(option) => option.name}
        onChange={(e, op) => handleSelectedProduct(e, op)}
        renderInput={(params) => (
          <TextField
            {...params}
            value={inputProduct}
            onChange={handleChangeInputProduct}
            placeholder="Chọn nhu yếu phẩm đã có trong kho"
          />
        )}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          },
        }}
      >
        <Box
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: { xs: "10px", sm: "0px" },
          }}
        >
          <Typography sx={{ minWidth: { xs: "120px" } }}>Số lượng:</Typography>
          <TextField
            sx={{ width: "100px" }}
            value={quantity}
            size="small"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Box>
        <Box
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: { xs: "10px", sm: "0px" },
          }}
        >
          <Typography sx={{ minWidth: { xs: "120px" } }}>Đơn vị:</Typography>
          <TextField
            sx={{ width: "100px" }}
            value={unit}
            size="small"
            onChange={(e) => setUnit(e.target.value)}
          />
        </Box>
      </Box>
      <Box className="d-flex" sx={{ width: "100%" }}>
        <Typography sx={{ minWidth: "120px" }}>Hạn sử dụng:</Typography>
        <DateTimePicker
          valueDay={date}
          handleDateTimePicker={handleDateTimePicker}
          sizeDateTime={"medium"}
        />
      </Box>
      <Box className="d-flex" sx={{ width: "100%" }}>
        <Autocomplete
          id="free-solo-address"
          fullWidth
          freeSolo
          options={listAddress}
          getOptionLabel={(option) => option.name}
          onChange={(e, op) => handleSelectedAddress(e, op)}
          renderInput={(params) => (
            <TextField
              {...params}
              value={inputAddress}
              onChange={handleChangeInputAddress}
              placeholder="Chọn nơi mua"
            />
          )}
        />
        <Tooltip title="Thêm địa chỉ mới">
          <IconButton onClick={handleAddAddress}>
            <AddLocationAltIcon
              sx={{ fontSize: "40px", color: Colors.textPrimary }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        {prod !== null ? (
          <CustomComponent.Button1 onClick={handleAddProd}>
            Thêm sản phẩm vào kho
          </CustomComponent.Button1>
        ) : (
          <CustomComponent.Button1 onClick={(event) => handleCreatePro()}>
            Tạo sản phẩm mới
          </CustomComponent.Button1>
        )}
      </Box>
    </Stack>
  );
}

export default AddProduct;
