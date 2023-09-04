import React, { useEffect, useRef, useState } from "react";

import { createAxios } from "../../http/createInstance";

import {
  Box,
  InputBase,
  InputAdornment,
  IconButton,
  Stack,
  ButtonBase,
  Typography,
  Tooltip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { searchPurchaseLocations } from "../../redux/stockRequest";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/Autocomplete.scss";
import { Colors } from "../../config/Colors";

function SelectedAddress({ grID, handleSelectedAddress }) {
  const boxRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [address, setAddress] = useState();
  const [inputValue, setInputValue] = useState("");

  const searchDataPurchaseLocations = async (character) => {
    const res = await searchPurchaseLocations(
      character,
      grID,
      user?.accessToken,
      axiosJWT
    );
    setAddress(res);
  };
  const handleChangeInput = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataPurchaseLocations(character);
    }, 500);
    setInputValue(character);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const handleSelectItem = (e, addr) => {
    let data =
      addr.name +
      ", " +
      addr.address.addressLine1 +
      ", " +
      addr.address.wardName +
      ", " +
      addr.address.districtName +
      ", " +
      addr.address.provinceName;

    setInputValue(data);
    handleSelectedAddress(addr.id);
    setAddress("");
  };
  useEffect(() => {
    window.onclick = (event) => {
      if (
        event.target.contains(boxRef.current) &&
        event.target !== boxRef.current
      ) {
        setAddress("");
      }
    };
  }, []);
  return (
    <Stack sx={{ width: "100%" }}>
      <Box className="d-flex" sx={{ width: "100%" }}>
        <Box
          className="box-input-product text-displayed"
          sx={{ width: "100%" }}
        >
          <InputBase
            value={inputValue}
            fullWidth
            placeholder="Chọn nơi mua"
            onChange={handleChangeInput}
            endAdornment={
              <InputAdornment position="end">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {inputValue ? (
                    <IconButton
                      sx={{ opacity: 0.5 }}
                      onClick={handleClearInput}
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : null}
                </Box>
              </InputAdornment>
            }
          />
        </Box>
        <Tooltip title="Thêm địa chỉ">
          <IconButton sx={{ width: "50px" }}>
            <AddLocationAltIcon sx={{ color: Colors.textPrimary }} />
          </IconButton>
        </Tooltip>
      </Box>
      
      {address != null && address.length > 0 ? (
        <Box
          className="auto-input"
          id="id-auto-input"
          ref={boxRef}
          sx={{ width: `calc(100% - 60px)` }}
        >
          {address.map((p, idx) => (
            <ButtonBase
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                paddingY: "5px",
              }}
              onClick={(e) => handleSelectItem(e, p)}
              key={idx}
              className="box-input-search"
            >
              <Typography className="text-displayed">
                {p.name}, {p.address.addressLine1} , {p.address.wardName},{" "}
                {p.address.districtName}, {p.address.provinceName}
              </Typography>
            </ButtonBase>
          ))}
        </Box>
      ) : null}
    </Stack>
  );
}

export default SelectedAddress;
