import React, { useEffect } from "react";

import { createAxios } from "../http/createInstance";

import DefaultLayout from "../layout/DefaultLayout";
import {
  getProductItemById,
} from "../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import ProductDetail from "../features/Product/ProductDetail";

function Product() {
  const urlQuery = new URL(window.location.href).searchParams;
  const grId = urlQuery.get("grId");
  const storageID = urlQuery.get("storageId");
  const productId = urlQuery.get("productId");

  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    const getProductItem = async () => {
      await getProductItemById(
        grId,
        productId,
        user?.accessToken,
        dispatch,
        axiosJWT
      );
    };

    getProductItem().catch(console.error);

    return () => {
      getProductItem();
    };
  }, [axiosJWT, dispatch, grId, productId, storageID, user?.accessToken]);
  return (
    <DefaultLayout>
      <ProductDetail grId={grId} storageID={storageID} productId={productId} />
    </DefaultLayout>
  );
}

export default Product;
