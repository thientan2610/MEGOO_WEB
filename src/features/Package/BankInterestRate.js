import React, { useState } from "react";

import {
  Box,
  InputAdornment,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TextFieldCustom from "../../component/text-field/TextFieldCustom";
import * as CustomComponent from "../../component/custom/CustomComponents";
import * as FormatNum from "../../component/custom/FormatDateNumber";
import { Colors } from "../../config/Colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function BankInterestRate() {
  const [price, setPrice] = useState();
  const [interest, setInterest] = useState();
  const [duration, setDuration] = useState();
  const [moneyInterest, setMoneyIntterest] = useState();
  const [total, setTotal] = useState();
  const [newInterest, setNewInterest] = useState();
  const [newDuration, setNewDuration] = useState();
  const [newTotal, setNewTotal] = useState();
  const [totalExpire, setTotalExpire] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenExpire, setIsOpenExpire] = useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const ChangeValue = (value) => {
    setPrice(value);
  };

  const handleCalculateInterestRate = () => {
    let x = ((price * interest) / 100 / 12) * duration;
    setMoneyIntterest(x);
    setTotal(parseInt(price) + parseInt(x));
    setIsOpen(true);
  };

  const handleCompareInterest = () => {
    let x = ((total * newInterest) / 100 / 12) * newDuration;
    setNewTotal(parseInt(total) + parseInt(x));
    let n = Math.floor(newDuration / duration);
    let y = total * Math.pow(1 + 0.5 / n, n);
    setTotalExpire(parseInt(y));
    setIsOpenExpire(true);
    setOpenModal(false);
  };

  return (
    <Stack spacing={2} className="interest-rate">
      <Typography className="title">Lãi suất ngân hàng</Typography>
      <Typography className="summary">
        Công cụ tính lãi suất tiết kiệm ngân hàng giúp bạn dễ dàng biết được số
        tiền lãi trong tương lai. Từ đó có thể so sánh các mức lãi suất ngân
        hàng, kỳ hạn gửi và đưa ra quyết định có lợi nhất cho mình.
      </Typography>
      <Box
        className="box-interest-rate"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Box
          className="box-textfield-1"
          sx={{ width: { xs: "100%", sm: "50%" } }}
        >
          <Typography className="title-textfield">Số tiền gửi</Typography>
          <Box
            sx={{
              minWidth: "270px",
              width: "100%",
              backgroundColor: Colors.background,
            }}
          >
            <TextFieldCustom
              labelText={""}
              sizeText={"medium"}
              ChangeValue={ChangeValue}
            />
          </Box>
        </Box>
        <Box
          className="box-textfield-1"
          sx={{ width: { xs: "100%", sm: "50%" } }}
        >
          <Typography className="title-textfield">Lãi suất gửi</Typography>
          <TextField
            fullWidth
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">%/năm</InputAdornment>
              ),
            }}
            sx={{ minWidth: "270px", backgroundColor: Colors.background }}
          />
        </Box>
      </Box>
      <Box
        className="box-interest-rate"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Box
          className="box-textfield-1"
          sx={{ width: { xs: "100%", sm: "50%" } }}
        >
          <Typography className="title-textfield">Kỳ hạn gửi</Typography>
          <TextField
            fullWidth
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">tháng</InputAdornment>
              ),
            }}
            sx={{ minWidth: "270px", backgroundColor: Colors.background }}
          />
        </Box>
        <Box
          className="box-textfield-1"
          sx={{ width: { xs: "100%", sm: "50%" } }}
        >
          <CustomComponent.Button1
            sx={{ height: "56px" }}
            onClick={handleCalculateInterestRate}
          >
            Thực hiện
          </CustomComponent.Button1>
        </Box>
      </Box>
      {isOpen && (
        <Stack spacing={1.5}>
          <Typography className="title-1">
            Sau khi đến kỳ hạn, bạn sẽ nhận được:
          </Typography>
          <Table className="table">
            <TableBody>
              <TableRow>
                <TableCell className="table-cell-1">Tiền lãi sau {duration} tháng</TableCell>
                <TableCell className="table-cell-2">{FormatNum.formatCurrency(moneyInterest)}</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell className="table-cell-1">Tổng tiền</TableCell>
                <TableCell className="table-cell-2">{FormatNum.formatCurrency(total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography className="summary">
            Nếu bạn đang phân vân giữa tái đầu tư lại lại lãi suất đã tính ở
            trên hoặc gửi lại với một lãi suất khác. Chúng tôi có thể tính giúp
            bạn.
          </Typography>
          <Box>
            <CustomComponent.Button2 onClick={handleOpenModal}>
              Tiếp tục
            </CustomComponent.Button2>
          </Box>
          {isOpenExpire && (
            <Box>
              <Table className="table">
                <TableHead>
                  <TableRow >
                    <TableCell></TableCell>
                    <TableCell className="table-cell-1">Đáo hạn</TableCell>
                    <TableCell className="table-cell-1">Lãi suất mới</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className="table-cell-3">Tổng tiền</TableCell>
                    <TableCell className="table-cell-2">
                      {FormatNum.formatCurrency(totalExpire)}
                    </TableCell>
                    <TableCell className="table-cell-2">{FormatNum.formatCurrency(newTotal)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          )}
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={style}>
              <Stack spacing={2}>
                <Box>
                  <Typography className="title-textfield">
                    Lãi suất mới
                  </Typography>
                  <TextField
                    fullWidth
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%/năm</InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box>
                  <Typography className="title-textfield">
                    Kỳ hạn gửi mới
                  </Typography>
                  <TextField
                    fullWidth
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">tháng</InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <CustomComponent.Button1 onClick={handleCompareInterest}>
                    Thực hiện
                  </CustomComponent.Button1>
                </Box>
              </Stack>
            </Box>
          </Modal>
        </Stack>
      )}
    </Stack>
  );
}

export default BankInterestRate;
