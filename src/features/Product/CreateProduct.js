import React, { useRef, useState } from "react";

import {
  Stack,
  Typography,
  Box,
  TextField,
  Autocomplete,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import { createAxios } from "../../http/createInstance";
import "../../assets/css/Product.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import DateTimePicker from "../../component/Date/DateTimePicker";
import {
  addGroupProducts,
  addItemsToStorage,
  searchPurchaseLocations,
} from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { Colors } from "../../config/Colors";
import NoImg from "../../assets/img/image.png";
import {
  updateMessage,
  updateOpenSnackbar,
  updateProgress,
  updateStatus,
} from "../../redux/messageSlice";
import TextFieldCustom from "../../component/text-field/TextFieldCustom";

function CreateProduct({
  grId,
  storageID,
  handleAddAddress,
  handleOpenAdd,
  handleCloseCreatePro,
}) {
  const inputRef = useRef();
  const nowDate = new Date();
  const [date, setDate] = useState(nowDate);

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [fileImg, setFileImg] = useState(NoImg);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [region, setRegion] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [descrip, setDescrip] = useState("");
  const [addr, setAddr] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [listAddress, setListAdrress] = useState([]);

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  const ChangeValue = (value) => {
    setPrice(value);
  }

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setImage(fileObj);
    setFileImg(URL.createObjectURL(fileObj));
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

  const handleAddProduct = async () => {
    if (name.length <= 0) {
      return;
    }

    let formData1 = {
      name: name,
      barcode: barcode,
      price: price,
      region: region,
      brand: brand,
      category: category,
      description: descrip,
      groupId: grId,
      file: image,
    };
    handleCloseCreatePro();
    dispatch(updateProgress(true));

    const resProduct = await addGroupProducts(
      // grId,
      // storageID,
      formData1,
      user?.accessToken,
      //dispatch,
      axiosJWT
    );

    if (resProduct?.statusCode !== 201) {
      dispatch(updateOpenSnackbar(true));
      dispatch(updateStatus(false));
      dispatch(updateMessage("Thêm nhu yếu phẩm vào kho lưu trữ thất bại!"));
      handleCloseCreatePro();
      return;
    }

    let formData2 = {
      addedBy: user?.data.userInfo._id,
      bestBefore: date,
      quantity: quantity,
      unit: unit,
      groupProductId: resProduct?.data.id,
      storageLocationId: storageID,
      purchaseLocationId: addr,
    };

    const resItem = await addItemsToStorage(
      grId,
      storageID,
      formData2,
      user?.accessToken,
      dispatch,
      axiosJWT
    );


    if (resItem != null) {
      dispatch(updateProgress(false));
      if (resItem?.statusCode === 201) {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(
          updateMessage("Thêm nhu yếu phẩm vào kho lưu trữ thành công!")
        );
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
      id="createProduct"
      className="createCreateProduct"
    >
      <Box className="box-img-create-product">
        <CustomComponent.Button2
          onClick={handleClick}
          sx={{ width: "fit-content" }}
        >
          <Typography variant="body2">Chọn hình ảnh</Typography>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </CustomComponent.Button2>
        <Box flex={1} sx={{ display: "flex", justifyContent: "center" }}>
          <img src={fileImg} alt="ImageProduct" className="file-img" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <TextField
          fullWidth
          value={name}
          label="Tên sản phẩm"
          sx={{
            paddingRight: { xs: "0px", sm: "5px" },
            paddingBottom: { xs: "5px", sm: "0px" },
          }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          value={barcode}
          label="Barcode"
          sx={{
            paddingLeft: { xs: "0px", sm: "5px" },
            paddingTop: { xs: "5px", sm: "0px" },
          }}
          onChange={(e) => setBarcode(e.target.value)}
        />
      </Box>
      <Box className="d-flex">
        <Typography sx={{ minWidth: "120px" }}>Hạn sử dụng:</Typography>
        <DateTimePicker
          valueDay={date}
          handleDateTimePicker={handleDateTimePicker}
          sizeDateTime={"medium"}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        {/* <TextField
          size="small"
          fullWidth
          value={price}
          label="Giá tiền"
          sx={{
            paddingRight: { xs: "0px", sm: "5px" },
            paddingBottom: { xs: "5px", sm: "0px" },
          }}
          onChange={(e) => setPrice(e.target.value)}
        /> */}
        <TextFieldCustom labelText="Giá tiền" sizeText={"small"} ChangeValue={ChangeValue} />
        <TextField
          size="small"
          fullWidth
          value={quantity}
          label="Số lượng"
          sx={{
            paddingX: { xs: "0px", sm: "10px" },
            paddingY: { xs: "10px", sm: "0px" },
          }}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <TextField
          size="small"
          fullWidth
          value={unit}
          label="Đơn vị"
          sx={{
            paddingLeft: { xs: "0px", sm: "5px" },
            paddingTop: { xs: "5px", sm: "0px" },
          }}
          onChange={(e) => setUnit(e.target.value)}
        />
      </Box>
      <Box className="d-flex">
        <Typography sx={{ minWidth: "120px" }}>Khu vực:</Typography>
        <TextField
          size="small"
          fullWidth
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
      </Box>
      <Box className="d-flex">
        <Typography sx={{ minWidth: "120px" }}>Nhãn hiệu:</Typography>
        <TextField
          size="small"
          fullWidth
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </Box>
      <Box className="d-flex">
        <Typography sx={{ minWidth: "120px" }}>Loại:</Typography>
        <TextField
          size="small"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

      <TextField
        size="small"
        multiline
        value={descrip}
        rows={2}
        fullWidth
        label="Mô tả sản phẩm"
        onChange={(e) => setDescrip(e.target.value)}
      />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <CustomComponent.Button2
          sx={{ width: "135px", marginRight: "5px" }}
          onClick={handleOpenAdd}
        >
          Trở lại
        </CustomComponent.Button2>
        <CustomComponent.Button1
          sx={{ width: "135px", marginLeft: "5px" }}
          onClick={handleAddProduct}
        >
          Thêm sản phẩm
        </CustomComponent.Button1>
      </Box>
    </Stack>
  );
}

export default CreateProduct;
