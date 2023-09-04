import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  InputBase,
  Divider,
  IconButton,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { AiOutlineBars } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { createAxios } from "../../http/createInstance.js";
import SockectIO from "../../http/socket.js";
import {
  toggleShowSidebar,
  updateNotiCheckout,
} from "../../redux/packageSlice";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Header.scss";
import { Colors } from "../../config/Colors.js";
import { dataHeader2 } from "../../data/index.js";
import HeaderAvatar from "./HeaderAvatar.js";

import * as SB from "../Chat/SendBirdGroupChat.js";
import { getUserCart } from "../../redux/packageRequest.js";
import LogoMegoo from "../../assets/img/Megoo.png";
import { useToast } from "rc-toastr";
import { updateProgress } from "../../redux/messageSlice.js";
import { useNavigate } from "react-router-dom";
import { getProductItemById, searchGroupProducts } from "../../redux/stockRequest.js";

const topSearch = [];

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  let user = useSelector((state) => state?.auth.login?.currentUser);
  const channels = useSelector((state) => state?.user?.channel);
  const [inputProduct, setInputProduct] = useState("");
  const [products, setProducts] = useState([]);
  const url = window.location.pathname;
  const urlQuery = new URL(window.location.href).searchParams;
  const grId = urlQuery.get("grId");
  const storageID = urlQuery.get("storageId");

  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const socket = SockectIO();

  let day = new Date();

  if (user !== null) {
    const decodedToken = jwtDecode(user?.accessToken);
    if (decodedToken.exp < day.getTime() / 1000) {
      dispatch(loginSuccess(null));
      navigate("/package");
    }
  }

  const handleHeaderBars = () => {
    dispatch(toggleShowSidebar());
  };

  const inviteInGroupChannel = async (channel, user) => {
    await SB.inviteMember(channel, user);
  };

  const searchDataGroupProducts = async (search) => {
    const res = await searchGroupProducts(
      search,
      grId,
      user?.accessToken,
      axiosJWT
    );
    setProducts(res);
  };

  const handleChangeInputProduct = (e) => {
    let character = e.target.value;
    setTimeout(async () => {
      await searchDataGroupProducts(character);
    }, 200);
    setInputProduct(character);
  };

  const handleSelectedProduct = (e, op) => {
    if (op) {
      console.log(op);
      navigate(
        `/stock/product-item?grId=${grId}&storageId=${storageID}&productId=${op.id}`
      );
    }
  };

  useEffect(() => {
    const userConnectChat = async () => {
      await SB.connectSendBird(user?.data.userInfo._id);

      await SB.setupUser(
        user?.data.userInfo._id,
        user?.data.userInfo.name,
        user?.data.userInfo.avatar
      );
    };

    userConnectChat().catch(console.error);

    return () => {
      userConnectChat();
    };
  }, [user?.data.userInfo]);

  useEffect(() => {
    socket.connect();

    socket.on("joinGr", async (data) => {
      console.log("join group: ", data);
      for (let channel of channels) {
        if (channel._id === data._id) {
          await inviteInGroupChannel(channel.channel, data.user);
        }
      }
    });

    socket.on("createdBill", (data) => {
      console.log("created bill: ", data);
      if (data.createdBy !== user?.data.userInfo._id) {
        toast.default(`Bạn có một chi tiêu "${data.summary}"`);
      }
    });

    socket.on("updatedBill", (data) => {
      console.log("updated bill: ", data);
      if (data.updatedBy !== user?.data.userInfo._id) {
        toast.default(`Chi tiêu "${data.summary}" đã được chỉnh sửa`);
      }
    });

    socket.on("createdTodos", (data) => {
      console.log("created todo: ", data);
      if (data.createdBy !== user?.data.userInfo._id) {
        toast.default(`Bạn có một danh sách cần làm "${data.summary}"`);
      }
    });

    socket.on("updatedTodos", (data) => {
      console.log("updated todo: ", data);
      if (data.updatedBy !== user?.data.userInfo._id) {
        toast.default(`Danh sách "${data.summary}" đã được chỉnh sửa`);
      }
    });

    socket.on("taskReminder", (data) => {
      console.log("taskReminder: ", data);
      if (data) {
        toast.default(`Bạn có một việc cần làm "${data.summary}"`);
      }
    });

    socket.on("funding", (data) => {
      console.log("funding: ", data);
      if (data) {
        toast.default(`Bạn có một phiếu quỹ "${data?.summary}"`);
      }
    });

    socket.on("zpCallback", async (data) => {
      console.log("socket-io zpCallback: ", data);
      if (data) {
        dispatch(updateNotiCheckout(1));
        await getUserCart(
          user?.data.userInfo._id,
          user?.accessToken,
          dispatch,
          axiosJWT
        );
      }
    });

    socket.on("vnpCallback", async (data) => {
      console.log("socket-io zpCallback: ", data);
      if (data) {
        dispatch(updateProgress(false));
        await getUserCart(
          user?.data.userInfo._id,
          user?.accessToken,
          dispatch,
          axiosJWT
        );
      }
    });

    socket.on("prodNoti", async (data) => {
      console.log("prodNoti data:", data);

      const resDto = await getProductItemById(
        data.groupId,
        data.itemId,
        user?.accessToken,
        dispatch,
        axiosJWT
      );

      const item = resDto.data;
      let message = "";

      switch (data.type) {
        case "outOfStock":
          message = `Nhu yếu phẩm <b>${item?.groupProduct?.name}</b> đã hết !`;
          break;
        case "runningOutOfStock":
          message = `Nhu yếu phẩm <b>${item?.groupProduct?.name}</b> sắp hết ! Chỉ còn ${item?.quantity} ${item?.unit}`;
          break;
        case "expiringSoon":
          message = `Nhu yếu phẩm <b>${item?.groupProduct?.name}</b> sắp hết hạn sử dụng !`;
          break;
        case "expired":
          message = `Nhu yếu phẩm <b>${item?.groupProduct?.name}</b> đã hết hạn sử dụng !`;
          break;
        default:
          break;
      }
      toast.default("Nhắc nhở nhu yếu phẩm", message);
      //displayNotification('Nhắc nhở nhu yếu phẩm', message);
    });

    return () => {
      // if (socket.readyState === 1) {
      //   socket.disconnect();
      // }
      socket.disconnect();
    };
  }, [
    axiosJWT,
    channels,
    dispatch,
    socket,
    toast,
    user?.accessToken,
    user?.data.userInfo._id,
  ]);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: Colors.background,
      }}
      className="header"
    >
      <Toolbar>
        <Stack flex={{ xs: 2, md: 1 }} className="app-bar">
          {url === "/stock" || url === "/group" || url === "/profile" ? (
            <Box display={{ xs: "block", md: "none" }}>
              <IconButton onClick={handleHeaderBars}>
                <AiOutlineBars />
              </IconButton>
            </Box>
          ) : null}

          <img src={LogoMegoo} alt="Logo" width={80} />
        </Stack>
        <Box
          flex={{ xs: 3, sm: 2 }}
          sx={{
            backgroundColor: Colors.search,
          }}
          className="search-bar"
        >
          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={topSearch}
            fullWidth
            renderInput={(params) => (
              <InputBase
                fullWidth
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                sx={{ flex: 1, color: Colors.text, paddingLeft: "10px" }}
                placeholder="Tìm kiếm..."
              />
            )}
          /> */}
          <Autocomplete
            id="free-solo-product"
            freeSolo
            fullWidth
            options={products}
            getOptionLabel={(option) => option.name}
            onChange={(e, op) => handleSelectedProduct(e, op)}
            renderInput={(params) => (
              <TextField
              variant="standard"
                {...params}
                value={inputProduct}
                onChange={handleChangeInputProduct}
                placeholder="Tìm kiếm..."
                sx={{ flex: 1, color: Colors.text,  }}
              />
            )}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="button"
            sx={{ color: Colors.primary, p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Stack
          flex={3}
          sx={{ display: { xs: "none", sm: "flex" } }}
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={{ xs: "5px", sm: "10px", md: "15px" }}
          className="nav-bar"
        >
          <HeaderAvatar data={dataHeader2} user={user} />
        </Stack>
      </Toolbar>
      <Toolbar sx={{ display: { xs: "flex", sm: "none" } }}>
        <Stack
          flex={1}
          sx={{ display: { xs: "flex", sm: "none" } }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={{ xs: "5px", sm: "10px", md: "15px" }}
        >
          <HeaderAvatar data={dataHeader2} user={user} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
