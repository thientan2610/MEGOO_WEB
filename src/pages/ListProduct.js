import React, { useEffect } from "react";

import { createAxios } from "../http/createInstance";

import ProductItem from "../features/Product/ProductItem";
import DefaultLayout from "../layout/DefaultLayout";
import {
  getProductItemsByStorage,
} from "../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

function ListProduct() {
  const urlQuery = new URL(window.location.href).searchParams;
  const grId = urlQuery.get("grId");
  const storageID = urlQuery.get("storageId");

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    const getListProduct = async () => {
      await getProductItemsByStorage(
        grId,
        1,
        5,
        storageID,
        1,
        null,
        user?.accessToken,
        dispatch,
        axiosJWT
      );
    };

    getListProduct().catch(console.error);

    return () => {
      getListProduct();
    };
  }, [axiosJWT, dispatch, grId, storageID, user?.accessToken]);
  return (
    <DefaultLayout>
      <ProductItem grId={grId} storageID={storageID} />
    </DefaultLayout>
  );
}

export default ListProduct;
