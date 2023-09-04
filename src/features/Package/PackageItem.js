import React from "react";
import { Box, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Banner from "../../assets/img/Banner.png";

// import { useSelector } from "react-redux";

import "../../assets/css/Package.scss";
import DetailItem from "./DetailItem";
import DetailItemRenew from "./DetailItemRenew";
import BankInterestRate from "./BankInterestRate";

function PackageItem({ data, grpId }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <img src={Banner} alt="Logo" width={"100%"} />
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className="containerPackage"
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="GÓI NGƯỜI DÙNG"
              value="1"
              sx={{ marginX: { xs: "0px", sm: "20px", md: "50px" } }}
            />
            <Tab
              label="CÁC TIỆN ÍCH"
              value="2"
              sx={{ marginX: { xs: "0px", sm: "20px", md: "50px" } }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: { xs: "wrap", sm: "wrap", lg: "nowrap" },
                justifyContent: { xs: "center", md: "flex-start" },
                paddingY: "3%",
              }}
            >
              {grpId === null
                ? data.child?.map((route) =>
                    route ? <DetailItem item={route} key={route._id} /> : null
                  )
                : data.child?.map((route) =>
                    route ? (
                      <DetailItemRenew
                        item={route}
                        grpId={grpId}
                        key={route._id}
                      />
                    ) : null
                  )}
            </Box>
          </Stack>
        </TabPanel>
        <TabPanel value="2">
          <BankInterestRate />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default PackageItem;
