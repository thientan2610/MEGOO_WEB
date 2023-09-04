import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useSelector } from "react-redux";

import { styled } from '@mui/material/styles';

import * as FormatNumber from "../../component/custom/FormatDateNumber";
import { Colors } from "../../config/Colors";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.chat,
    color: theme.palette.common.black,
  },
  '&:nth-of-type(1)': {
    borderRadius: "15px 0px 0px 0px",
  },
  '&:nth-of-type(4)': {
    borderRadius: "0px 15px 0px 0px",
  },
}));

function createData(
  _id,
  name,
  duration,
  price,
  noOfMember,
  createdAt,
  updatedAt
) {
  return {
    _id,
    name,
    duration,
    price,
    noOfMember,
    createdAt,
    updatedAt,
  };
}

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
    disablePadding: true,
    label: "Tên gói (đã mua)",
  },
  {
    id: "noOfMember",
    numeric: true,
    disablePadding: false,
    label: "Số thành viên (người)",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Giá tiền (đồng)",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Ngày mua",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="head-table-my-package">
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.id === "name" ? "left" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ paddingLeft: headCell.id === "name" ? "10px" : "normal" }}
          >
            <TableSortLabel
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
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const listPackage = useSelector((state) => state?.package?.myPackages);
  const [pkgSU, setPkgSU] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("createdAt");
  const [page, setPage] = React.useState(0);
  //const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    if (listPackage.length > 0) {
      let packageSuperUser = [];

      for (let pkgs of listPackage) {
        let i = pkgs._id;
        for (let pkg of pkgs.packages) {
          let j = 0;
          let formData = {
            _id: i + j,
            name: pkg.package.name,
            duration: pkg.package.duration,
            price: pkg.package.price,
            noOfMember: pkg.package.noOfMember,
            createdAt: pkg.package.createdAt,
            updatedAt: pkg.package.updatedAt,
          };
          packageSuperUser.push(formData);
          j++;
        }
      }

      setPkgSU(packageSuperUser);
    } else {
      setPkgSU([]);
    }
  }, [listPackage]);

  const rows = pkgSU.map((pkg) =>
    createData(
      pkg._id,
      pkg.name,
      pkg.duration,
      pkg.price,
      pkg.noOfMember,
      pkg.createdAt,
      pkg.updatedAt
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rows, rowsPerPage]
  );

  return (
    <Box
      className="box-my-package"
    >
      <Box className="title">
        <Typography className="text">Gói của tôi</Typography>
      </Box>
      <Paper
        sx={{
          width: "96%",
          mb: 2,
          borderRadius: "15px",
        }}
      >
        <TableContainer>
          <Table
            //sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow tabIndex={-1} key={row.name}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      sx={{ paddingLeft: "10px" }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.noOfMember}</TableCell>
                    <TableCell align="center">
                      {FormatNumber.formatCurrency(row.price)}
                    </TableCell>
                    <TableCell align="center">
                      {FormatNumber.formatDate(row.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
