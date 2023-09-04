import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import { Box, TableFooter } from "@mui/material";
import { Colors } from "../../config/Colors";
import * as FormatNumber from "../../component/custom/FormatDateNumber";
import { styled } from "@mui/material/styles";

import "../../assets/css/AllProduct.scss";
import {
  getAllProductInStock,
  getProductItemById,
} from "../../redux/stockRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../http/createInstance";
import { useNavigate } from "react-router-dom";

function createData(
  id,
  idStorage,
  idProduct,
  name,
  quantity,
  unit,
  money,
  exp,
  stock
) {
  return { id, idStorage, idProduct, name, quantity, unit, money, exp, stock };
}

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  "&.MuiTableSortLabel-root": {
    color: Colors.textPrimary,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Tên nhu yếu phẩm",
  },
  {
    id: "stock",
    numeric: false,
    disablePadding: false,
    label: "Kho lưu trữ",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Số lượng",
  },
  {
    id: "money",
    numeric: true,
    disablePadding: false,
    label: "Giá tiền",
  },
  {
    id: "exp",
    numeric: true,
    disablePadding: false,
    label: "Hạn sử dụng",
  },
];
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </StyledTableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function AllProductInStock({ item, p, grID, state, date }) {
  console.log("p", p);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth.login?.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("exp");
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(p.currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const rows = item.map((row) =>
    createData(
      row.id,
      row.storageLocation.id,
      row.groupProduct.id,
      row.groupProduct.name,
      row.quantity,
      row.unit,
      row.groupProduct.price ?? 0,
      row.bestBefore,
      row.storageLocation.name
    )
  );

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  const handleChangePage = async (event, newPage) => {
    let currentPage = newPage;
    await getAllProductInStock(
      grID,
      currentPage + 1,
      rowsPerPage,
      state,
      date,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    let limit = parseInt(event.target.value, 10);
    await getAllProductInStock(
      grID,
      1,
      limit,
      state,
      date,
      user?.accessToken,
      dispatch,
      axiosJWT
    );
    setRowsPerPage(limit);
    setPage(0);
  };

  const handleClick = async (e, id1, id2) => {
    await getProductItemById(grID, id2, user?.accessToken, dispatch, axiosJWT);
    navigate(
      `/stock/product-item?grId=${grID}&storageId=${id1}&productId=${id2}`
    );
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  useEffect(() => {
    setPage(p.currentPage - 1);
    setRowsPerPage(10);
  }, [p]);
  
  return (
    <Box sx={{ width: "100%" }}>
      <Paper className="table-all-product">
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => handleClick(e, row.idStorage, row.id)}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.stock}</TableCell>
                    <TableCell align="right">
                      {row.quantity} {row.unit}
                    </TableCell>
                    <TableCell align="right">
                      {FormatNumber.formatCurrency(row.money)}
                    </TableCell>
                    <TableCell align="right">{row.exp}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 20]}
                  labelRowsPerPage="Số hàng trên trang"
                  count={p.totalItems}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default AllProductInStock;
