import React, { useEffect, useState } from "react";

import { Avatar, Box, Stack, TextField, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { FaMoneyBillWave } from "react-icons/fa";

import * as CustomComponent from "../../../component/custom/CustomComponents";
import DateTimePicker from "../../../component/Date/DateTimePicker";
import CurrencyInput from "react-currency-input-field";
import "../../../assets/css/Funding.scss";

function FundingDetail({ item, title, members }) {
    // const initalChange = () => {
    //     let arr = [];
    //     for (let x of item?.history) {
    //       let formData = {
    //         _id: x._id,
    //       };
    //       for (let con of x.contributors) {
    //         let contributor = {
    //             user: con.user
    //         }
    //       }
    //       arr.push(formData);
    //     }
    //     return arr;
    //   };
  const flagFunding = title === "SUPER USER" ? true : false;
  const [date, setDate] = useState(item?.startDate);
  const [money, setMoney] = useState(item?.total);

  const handleDateTimePicker = (dateValue) => {
    setDate(dateValue.$d);
  };

  return (
    <Stack spacing={2} className="funding-detail">
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <Box flex={1} className="funding-detail-money">
          <Typography>Thời gian bắt đầu</Typography>
          {flagFunding ? (
            <DateTimePicker
              valueDay={date}
              handleDateTimePicker={handleDateTimePicker}
              sizeDateTime={"medium"}
            />
          ) : (
            <Typography>date</Typography>
          )}
        </Box>
        <Box flex={1} className="funding-detail-money">
          <Typography>Tổng tiền</Typography>
          {flagFunding ? (
            <CurrencyInput
              id="input-example"
              className="currency-input"
              value={money}
              decimalsLimit={2}
              onValueChange={(value) => setMoney(value)}
            />
          ) : (
            <Typography>money</Typography>
          )}
        </Box>
      </Box>
      <Typography>Lịch sử</Typography>
      {/* <Stack spacing={2}>
        {members.map((mem) =>
          mem ? (
            <Box>
              <Box className="funding-detail-members-name">
                <Avatar src={mem.avatar} />
                <Typography className="name">{mem.name}</Typography>
              </Box>
              <Box>
                <FaMoneyBillWave />
                <CurrencyInput
                  id="input-example"
                  className=""
                  value={money}
                  decimalsLimit={2}
                  onValueChange={(value) => setMoney(value)}
                />
              </Box>
            </Box>
          ) : null
        )}
      </Stack> */}
    </Stack>
  );
}

export default FundingDetail;
