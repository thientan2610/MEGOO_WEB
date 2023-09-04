import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Stack,
  Box,
  ButtonBase,
  IconButton,
  Input,
  InputAdornment,
  Typography,
  Modal,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ClearIcon from "@mui/icons-material/Clear";

import { createAxios } from "../../http/createInstance";

import {
  getGroupProducts,
  searchGroupProducts,
} from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Autocomplete.scss";

function AutocompletePopper({ title, grId, handleAutoCompleteProduct }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [inputValue, setInputValue] = useState("");
  const [focusInput, setFocusInput] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);

  const getDataOfGroupProducts = async () => {
    const res = await getGroupProducts(
      grId,
      page,
      5,
      user?.accessToken,
      axiosJWT
    );
    setData(res);
  };

  const searchDataGroupProducts = async (search) => {
    const res = await searchGroupProducts(
      search,
      grId,
      user?.accessToken,
      axiosJWT
    );
    setData(res);
  };

  const handleFocusInput = async () => {
    await getDataOfGroupProducts();
    setFocusInput(!focusInput);
  };

  // const handleBlurInput = () => {
  //   setFocusInput(false);
  // };

  const handleChangeInput = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataGroupProducts(character);
    }, 500);
    setInputValue(character);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const handleSelectItem = (e, prod) => {
    setInputValue(prod.name);
  };

  return (
    <Stack sx={{ width: "100%"}}>
      <Input
        value={inputValue}
        fullWidth
        onClick={handleFocusInput}
        // onFocus={handleFocusInput}
        // onBlur={handleBlurInput}
        onChange={handleChangeInput}
        ref={inputRef}
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
                <IconButton sx={{ opacity: 0.5 }} onClick={handleClearInput}>
                  <ClearIcon />
                </IconButton>
              ) : null}
              {focusInput ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Box>
          </InputAdornment>
        }
        sx={{ height: "20px" }}
      />
      {focusInput ? (
        <Box className="auto-input" spacing={2}>
          {data != null
            ? data.map((x, idx) => (
                <ButtonBase
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  key={x.id}
                  onClick={(e) => handleSelectItem(e, x)}
                >
                  <Typography className="text-displayed">{x.name}</Typography>
                </ButtonBase>
              ))
            : null}
        </Box>
      ) : null}
    </Stack>
  );
}

export default AutocompletePopper;
