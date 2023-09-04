import React from "react";

import DefaultLayout from "../layout/DefaultLayout";
import ShoppingParent from "../features/Shopping/ShoppingParent";
import { useSelector } from "react-redux";
import HomeLayoutNoGroup from "../features/Home/HomeLayoutNoGroup";
import ShoppingCartEmpty from "../features/Shopping/ShoppingCartEmpty";

function ShoppingCart() {
  const number = useSelector((state) => state?.package?.numberCart);
  return (
    <>
      {number > 0 ? (
        <DefaultLayout>
          <ShoppingParent />
        </DefaultLayout>
      ) : (
        <ShoppingCartEmpty />
      )}
    </>
  );
}

export default ShoppingCart;
