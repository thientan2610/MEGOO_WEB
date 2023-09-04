import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import ProductInStockLayout from "../features/Stock/ProductInStockLayout";

function ProductInStock() {
  const urlQuery = new URL(window.location.href).searchParams;
  const groupId = urlQuery.get("grId");
  return (
    <DefaultLayout>
      <ProductInStockLayout grID={groupId} />
    </DefaultLayout>
  );
}

export default ProductInStock;
