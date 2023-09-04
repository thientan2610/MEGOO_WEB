import React, { useState } from "react";

import { Box, Autocomplete, TextField, Stack, InputBase } from "@mui/material";
import { searchProvinceVietNam } from "../../redux/stockRequest";

const options = ["Option 1", "Option 2"];

function AddressVietNam({ handleAddress }) {
  const [province, setProvince] = useState(null);
  const [inputProvince, setInputProvince] = useState("");

  const [district, setDistrict] = useState(null);
  const [inputDistrict, setInputDistrict] = useState("");

  const [war, setWar] = useState(null);
  const [inputWar, setInputWar] = useState("");

  const searchDataProvince = async (character) => {
    await searchProvinceVietNam(character, )
  }

  const handleChangeProvince = async (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      //await searchDataPurchaseLocations(character);
    }, 500);
    setProvince(character);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box flex={1}>
        <InputBase
          fullWidth
          value={province}
          placeholder="Chọn tỉnh/thành phố..."
          onChange={handleChangeProvince}
        />
      </Box>
      <Box flex={1}>
        <Autocomplete
          disabled={province !== null ? false : true}
          value={district}
          fullWidth
          size="small"
          onChange={(event, newValue) => {
            setDistrict(newValue);
          }}
          inputValue={inputDistrict}
          onInputChange={(event, newInputValue) => {
            setInputDistrict(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          renderInput={(params) => <TextField {...params} label="Quận/huyện" />}
        />
      </Box>
      <Box flex={1}>
        <Autocomplete
          disabled={province === null || district === null ? true : false}
          fullWidth
          size="small"
          value={war}
          onChange={(event, newValue) => {
            setWar(newValue);
            handleAddress(province, district, newValue);
          }}
          inputValue={inputWar}
          onInputChange={(event, newInputValue) => {
            setInputWar(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          renderInput={(params) => <TextField {...params} label="Phường/Xã" />}
        />
      </Box>
    </Box>
  );
}

export default AddressVietNam;
