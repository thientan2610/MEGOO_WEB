import { Breadcrumbs, Link, Stack, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Colors } from "../../config/Colors";
import * as CustomComponent from "../../component/custom/CustomComponents";
import "../../assets/css/AllProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../http/createInstance";
import { getAllProductInStock } from "../../redux/stockRequest";
import AllProductInStock from "./AllProductInStock";

function ProductInStockLayout({ grID }) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state?.stock?.productInStock);
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [stateBtn, setStateBtn] = useState(1);
  const [nowDate, setNowDate] = useState("");

  const handleListProduct = async (e, state) => {
    let d = "";
    if (state === 2) {
      let date = new Date();
      let m = date.getMonth() + 1;
      d = date.getFullYear() + "-" + m + "-" + date.getDate();
      setNowDate(d);
    }
    const res = await getAllProductInStock(
      grID,
      1,
      10,
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
    <Stack spacing={2} className="all-product">
      <Box>
        <Breadcrumbs>
          <Link underline="hover" color={Colors.textPrimary} href="/stock">
            Quay về trang trước
          </Link>
          <Typography color="text.primary"> Danh sách nhu yêu phẩm </Typography>
        </Breadcrumbs>
      </Box>
      <Box className="btn-select-product">
        <Box className="btn-btn-select-product">
          {stateBtn !== 1 ? (
            <CustomComponent.Button4
              className="btn-btn"
              onClick={(e) => handleListProduct(e, 1)}
            >
              Tất cả
            </CustomComponent.Button4>
          ) : (
            <CustomComponent.Button3 className="btn-btn">
              Tất cả
            </CustomComponent.Button3>
          )}
          {stateBtn !== 2 ? (
            <CustomComponent.Button4
              className="btn-btn"
              onClick={(e) => handleListProduct(e, 2)}
            >
              Hết hạn
            </CustomComponent.Button4>
          ) : (
            <CustomComponent.Button3 className="btn-btn">
              Hết hạn
            </CustomComponent.Button3>
          )}
          {stateBtn !== 3 ? (
            <CustomComponent.Button4
              className="btn-btn"
              onClick={(e) => handleListProduct(e, 3)}
            >
              Sắp hết
            </CustomComponent.Button4>
          ) : (
            <CustomComponent.Button3 className="btn-btn">
              Sắp hết
            </CustomComponent.Button3>
          )}
        </Box>
      </Box>

      <Box className="product-in-stock">
        {list?.data && list?.data.length > 0 ? (
          <AllProductInStock
            item={list?.data}
            p={list?.meta}
            grID={grID}
            state={stateBtn}
            date={nowDate}
          />
        ) : (
          <Typography sx={{ mt: 1, color: Colors.purpleGray}}>Danh sách nhu yếu phẩm rỗng</Typography>
        )}
      </Box>
    </Stack>
  );
}

export default ProductInStockLayout;
