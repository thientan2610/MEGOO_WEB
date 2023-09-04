import { createSlice } from "@reduxjs/toolkit";

const stockSlide = createSlice({
  name: "stock",
  initialState: {
    listStock: null,
    sidebarStock: null,
    idStock: 0,
    productItem: null,
    listProduct: {
      data: null,
      meta: null,
    },
    productInStock: null,
  },
  reducers: {
    updateListStock: (state, action) => {
      state.listStock = action.payload;
    },
    updateSidebarStock: (state, action) => {
      state.sidebarStock = action.payload;
    },
    setIdOfStock: (state, action) => {
      state.idStock = action.payload;
    },
    updateProductItem: (state, action) => {
      state.productItem = action.payload;
    },
    updateListProduct: (state, action) => {
      state.listProduct.data = action.payload;
    },
    updateMetaListProduct: (state, action) => {
      state.listProduct.meta = action.payload;
    },
    updateListProductInStock: (state, action) => {
      state.productInStock = action.payload;
    }
  },
});

export const {
  updateListStock,
  updateSidebarStock,
  setIdOfStock,
  updateProductItem,
  updateListProduct,
  updateMetaListProduct,
  updateListProductInStock,
} = stockSlide.actions;

export default stockSlide.reducer;
