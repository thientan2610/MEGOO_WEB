import React from "react";
import { Stack, Breadcrumbs, Link, Typography } from "@mui/material";
import { Colors } from "../../config/Colors";
import { useSelector } from "react-redux";
import ItemDetail from "./ItemDetail";

function ProductDetail({ grId, storageID }) {
  const product = useSelector((state) => state?.stock?.productItem);
  return (
    <Stack
      spacing={3}
      sx={{
        paddingX: { xs: "2%", md: "5%" },
        width: "100%",
        paddingY: "40px",
      }}
    >
      <Breadcrumbs>
        <Link underline="hover" color={Colors.textPrimary} href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color={Colors.textPrimary} href="/stock">
          Kho lưu trữ
        </Link>
        <Link
          underline="hover"
          color={Colors.textPrimary}
          href={`/stock/product-stock?grId=${grId}&storageId=${storageID}`}
        >
          Các nhu yếu phẩm trong kho
        </Link>
        <Typography color="text.primary"> Nhu yếu phẩm </Typography>
      </Breadcrumbs>
      <ItemDetail item={product} grId={grId} />
    </Stack>
  );
}

export default ProductDetail;
