import React, { useState } from "react";
import { Box, Typography, Slide, IconButton, Modal } from "@mui/material";
import Carousel from "better-react-carousel";

import EditIcon from "@mui/icons-material/Edit";

import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../config/Colors.js";
import ModalEditStock from "./ModalEditStock.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "60%", lg: "40%" },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

function ImageStock({ item, grID }) {
  const navigate = useNavigate();

  // const initSlide = () => {
  //   let arr = [];
  //   for (let el of item) {
  //     let formData = {
  //       id: el.id,
  //       status: false
  //     };
  //     arr.push(formData);
  //   }
  //   return arr;
  // }

  const [openDetail, setOpenDetail] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editStock, setEditStock] = useState(null);
  // const [status, setStatus] = useState(false);
  // const [msg, setMsg] = useState("");
  // const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickImage = (e, id) => {
    console.log(id);
    navigate(`/stock/product-stock?grId=${grID}&storageId=${id}`);
  };

  const handleUpdateStock = (e, stock) => {
    setEditStock(stock);
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleColumnsCarousel = () => {
    if (item.length > 6) {
      return 3;
    } else if (item.length > 3) {
      return 2;
    } else {
      return 1;
    }
  };

  const isSelected = (id) => {
    if (id === openDetail) {
      return true;
    }
    return false;
  };

  const handleMountOnEnter = (e, id) => {
    setOpenDetail(id);
  };

  const handleMountOnExit = () => {
    setOpenDetail("");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Carousel cols={3} rows={handleColumnsCarousel} gap={10} loop>
        {item.map((stock, idx) =>
          stock ? (
            <Carousel.Item key={idx}>
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "70%", md: "100%" },
                }}
              >
                <CustomComponent.ImageButtonStock
                  focusRipple
                  style={{
                    width: "100%",
                  }}
                  onClick={(e) => handleClickImage(e, stock.id)}
                  onMouseEnter={(e) => handleMountOnEnter(e, stock.id)}
                  onMouseLeave={(e) => handleMountOnExit(e)}
                >
                  <CustomComponent.ImageSrcStock
                    style={{ backgroundImage: `url(${stock.image})` }}
                  />
                  <CustomComponent.ImageBackdropStock className="MuiImageBackdrop-root" />
                  <CustomComponent.ImageStock>
                    <Slide
                      direction="up"
                      in={isSelected(stock.id)}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "40%",
                          bgcolor: Colors.search,
                          borderRadius: "0px 0px 20px 20px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography> {stock.name} </Typography>
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontStyle: "italic",
                          }}
                        >
                          {stock.description}
                        </Typography>
                      </Box>
                    </Slide>
                  </CustomComponent.ImageStock>
                </CustomComponent.ImageButtonStock>
                <IconButton
                  sx={{ position: "absolute", top: "0", right: "0" }}
                  onClick={(e) => handleUpdateStock(e, stock)}
                >
                  <Box className="box-edit-stock">
                    <EditIcon
                      color={Colors.black}
                      size={25}
                      className="btn-edit-stock"
                    />
                  </Box>
                </IconButton>
              </Box>
            </Carousel.Item>
          ) : null
        )}
      </Carousel>
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-edit-stock"
        aria-describedby="modal-modal-edit-stock"
      >
        <Box sx={style}>
          <ModalEditStock
            item={editStock}
            grID={grID}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default ImageStock;
