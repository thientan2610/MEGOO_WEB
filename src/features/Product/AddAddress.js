import React, { useEffect, useState } from "react";

import { Autocomplete, Box, TextField, Stack } from "@mui/material";
import { createAxios } from "../../http/createInstance";
import {
  addPurchaseLocations,
  searchDistrictVietNam,
  searchProvinceVietNam,
  searchWarVietNam,
} from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";

import * as CustomComponent from "../../component/custom/CustomComponents";
import { loginSuccess } from "../../redux/authSlice";

import { updateMessage, updateOpenSnackbar, updateProgress, updateStatus } from "../../redux/messageSlice";

function AddAddress({ grID, handleCloseAddress }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [prov, setProv] = useState(null);
  const [inputProvince, setInputProvince] = useState("");
  const [listProv, setListProv] = useState([]);

  const [dist, setDist] = useState(null);
  const [inputDistrict, setInputDistrict] = useState("");
  const [listDist, setListDist] = useState([]);

  const [war, setWar] = useState(null);
  const [inputWar, setInputWar] = useState("");
  const [listWar, setListWar] = useState([]);

  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);

  const searchDataProvince = async (search) => {
    const res = await searchProvinceVietNam(search, user?.accessToken);
    setListProv(res);
  };

  const handleChangeInputProvince = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataProvince(character);
    }, 200);
    setInputProvince(character);
  };

  const handleFocusProvince = async () => {
    await searchDataProvince("");
  };

  const handleSelectedProvince = (e, op) => {
    setProv(op);
  };

  const searchDataDistrict = async (search) => {
    const res = await searchDistrictVietNam(search, prov.code, user?.accessToken);
    setListDist(res);
  };

  const handleChangeInputDistrict = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataDistrict(character);
    }, 200);
    setInputDistrict(character);
  };

  const handleFocusDistrict = async () => {
    await searchDataDistrict("");
  };

  const handleSelectedDistrict = (e, op) => {
    setDist(op);
  };

  const searchDataWar = async (search) => {
    const res = await searchWarVietNam(search, dist.code, user?.accessToken);
    setListWar(res);
  };

  const handleChangeInputWar = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataWar(character);
    }, 200);
    setInputWar(character);
  };

  const handleFocusWar = async () => {
    await searchDataWar("");
  };

  const handleSelectedWar = (e, op) => {
    setWar(op);
  };

  const handleAddAddress = async () => {
    handleCloseAddress();
    dispatch(updateProgress(true));
    let address = {
      addressLine1: street,
      addressLine2: "",
      provinceName: prov.name,
      districtName: dist.name,
      wardName: war.name
    };

    let formData = {
      name: name,
      addedBy: user?.data.userInfo._id,
      address: address,
      groupId: grID
    };

    const res = await addPurchaseLocations(formData, user?.accessToken, axiosJWT);
    if (res != null) {
      dispatch(updateProgress(false));
      if (res?.statusCode === 201) {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(true));
        dispatch(updateMessage("Thêm địa chỉ thành công!"));
      } else {
        dispatch(updateOpenSnackbar(true));
        dispatch(updateStatus(false));
        dispatch(updateMessage("Thêm địa chỉ thất bại!"));
      }
    }
  };

  useEffect(() => {
    if (prov != null && dist != null && war != null && street.length > 0) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [dist, prov, street, war]);
  return (
    <Stack spacing={2}>
      <Autocomplete
        clearOnEscape
        noOptionsText=""
        loading={true}
        loadingText="Loading..."
        options={listProv}
        getOptionLabel={(option) => option.name}
        onChange={(e, op) => handleSelectedProvince(e, op)}
        renderInput={(params) => (
          <TextField
            {...params}
            onFocus={handleFocusProvince}
            value={inputProvince}
            onChange={handleChangeInputProvince}
            label="Tỉnh/thành phố"
            variant="standard"
          />
        )}
      />
      <Autocomplete
        clearOnEscape
        noOptionsText=""
        loading={true}
        loadingText="Loading..."
        options={listDist}
        getOptionLabel={(option) => option.name}
        onChange={(e, op) => handleSelectedDistrict(e, op)}
        disabled={prov != null ? false : true}
        renderInput={(params) => (
          <TextField
            {...params}
            onFocus={handleFocusDistrict}
            value={inputDistrict}
            onChange={handleChangeInputDistrict}
            label="Quận/huyện"
            variant="standard"
          />
        )}
      />
      <Autocomplete
        clearOnEscape
        noOptionsText=""
        loading={true}
        loadingText="Loading..."
        options={listWar}
        getOptionLabel={(option) => option.name}
        onChange={(e, op) => handleSelectedWar(e, op)}
        disabled={prov != null && dist != null ? false : true}
        renderInput={(params) => (
          <TextField
            {...params}
            onFocus={handleFocusWar}
            value={inputWar}
            onChange={handleChangeInputWar}
            label="Phường/xã"
            variant="standard"
          />
        )}
      />
      <TextField
        fullWidth
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        label="Địa chỉ cụ thể"
        variant="standard"
      />
      <TextField
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Tên cửa hàng"
        variant="standard"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <CustomComponent.Button2 sx={{ width: "120px", marginRight: "5px" }}>
          Trở lại
        </CustomComponent.Button2> */}
        <CustomComponent.Button1
          sx={{ width: "120px", marginLeft: "5px" }}
          disabled={btnDisable}
          onClick={handleAddAddress}
        >
          Thêm địa chỉ
        </CustomComponent.Button1>
      </Box>
    </Stack>
  );
}

export default AddAddress;
