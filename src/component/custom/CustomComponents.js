import {
  Button,
  OutlinedInput,
  styled,
  ButtonBase,
  Switch,
  TextField,
  Box,
  Slider,
  Chip,
} from "@mui/material";

import { Colors } from "../../config/Colors";

export const ButtonNoti = styled(Button)({
  backgroundColor: Colors.background,
  color: Colors.black,
  textTransform: "lowercase",
  "&:hover": {
    backgroundColor: Colors.search,
  },
});

export const ButtonPopperAvatar = styled(ButtonBase)({
  backgroundColor: Colors.background,
  color: Colors.black,
  padding: "10px",
  //borderRadius: "20px",
  "&:hover": {
    backgroundColor: Colors.search,
    borderRadius: "10px",
  },
});

export const GroupChat = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  width: "100%",
  height: "fit-content",
  minHeight: "70px",
  '&:hover': {
    backgroundColor: "#e6e6e6",
  }
}));

export const ImageSrcGC = styled("span")({
  position: "absolute",
  borderRadius: "20px",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "0px 5px 0px 5px",
  wordBreak: "break-all",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const Button1 = styled(Button)({
  backgroundColor: Colors.btnFill,
  color: Colors.background,
  "&:hover": {
    backgroundColor: Colors.primary,
  },
  borderRadius: "5px",
});

export const Button2 = styled(Button)({
  backgroundColor: Colors.background,
  border: "1px solid",
  borderColor: Colors.btnFill,
  color: Colors.btnFill,
  "&:hover": {
    backgroundColor: Colors.btnOutline,
    border: "2px solid",
  },
  borderRadius: "5px",
});

export const Button3 = styled(Button)({
  backgroundColor: Colors.purpleGray,
  color: Colors.background,
  "&:hover": {
    backgroundColor: Colors.purpleGrayBold,
  },
  borderRadius: "5px",
});

export const Button4 = styled(Button)({
  backgroundColor: Colors.background,
  border: "1px solid",
  borderColor: Colors.purpleGray,
  color: Colors.purpleGray,
  "&:hover": {
    backgroundColor: Colors.btnPurpleGray,
    border: "2px solid",
  },
  borderRadius: "5px",
});

export const ButtonTodo = styled(Button)({
  backgroundColor: Colors.purpleGray,
  color: Colors.background,
  height: "56px",
  "&:hover": {
    backgroundColor: Colors.purpleGrayBold,
  },
  borderRadius: "5px",
});

export const ChipFunding1 = styled(Chip)({
  backgroundColor: Colors.btnFill,
  color: Colors.background,
  "&:hover": {
    backgroundColor: Colors.primary,
  },
});

export const ChipFunding2 = styled(Chip)({
  backgroundColor: Colors.background,
  border: "1px solid",
  borderColor: Colors.btnFill,
  color: Colors.btnFill,
  "&:hover": {
    backgroundColor: Colors.btnOutline,
    border: "2px solid",
  },
});

export const ChipFunding3 = styled(Chip)({
  backgroundColor: Colors.background,
  border: "1px solid",
  borderColor: Colors.purpleGrayBold,
  color: Colors.purpleGrayBold,
  "&:hover": {
    backgroundColor: Colors.btnPurpleGray,
    border: "2px solid",
  },
});

export const ChipFunding4 = styled(Chip)({
  backgroundColor: Colors.background,
  border: "1px solid",
  borderColor: Colors.pin,
  color: Colors.pin,
  "&:hover": {
    backgroundColor: "#00e6c7",
    border: "2px solid",
  },
});

export const ButtonProduct = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  // borderRadius: "50%",
  width: "250px",
  height: "250px",
  [theme.breakpoints.down("md")]: {
    width: "180px !important", // Overrides inline-style
    height: "200px",
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0.15,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

export const ImageSrcProduct = styled("span")({
  position: "absolute",
  // borderRadius: "50%",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 50%",
});

export const ImageProduct = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  // [theme.breakpoints.down("md")]: {
  //   top: 0,
  // },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const ButtonAvatar = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  borderRadius: "50%",
  width: "180px",
  height: "180px",
  [theme.breakpoints.down("md")]: {
    width: "120px !important", // Overrides inline-style
    height: "120px",
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0.15,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

export const ImageSrc = styled("span")({
  position: "absolute",
  borderRadius: "50%",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

export const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 120,
  bottom: 0,
  [theme.breakpoints.down("md")]: {
    top: 100,
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

export const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  borderRadius: "50%",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  // backgroundColor: theme.palette.common.white,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

export const PasswordInput = styled(OutlinedInput)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  backgroundColor: "#fff",
  "& .MuiOutlinedInput-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    fontSize: 16,
    //width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },
}));

export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const CssTextField = styled(TextField)({
  backgroundColor: "#ffffff",
  minWidth: "20px",
  width: "60px",
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#B2BAC2",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

export const ImageButtonStock = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 250,
  borderRadius: "20px",
  // [theme.breakpoints.down("sm")]: {
  //   //width: "100% !important", // Overrides inline-style
  //   height: 200,
  // },
}));

export const ImageSrcStock = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  borderRadius: "20px",
  backgroundPosition: "center 40%",
});

export const ImageStock = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  // color: theme.palette.common.white,
}));

export const EditStock = styled("span")(({ theme }) => ({
  position: "absolute",
  //left: 0,
  right: 5,
  top: 5,
  //bottom: 0,
  color: theme.palette.common.white,
}));

export const ImageBackdropStock = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  // backgroundColor: theme.palette.common.white,
  opacity: 0.4,
  borderRadius: "20px",
  transition: theme.transitions.create("opacity"),
}));

export const ImageMarkedStock = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export const ModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  // transform: "translate(-50%, -50%)",
  width: 400,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  // bgcolor: theme.palette.common.white,
  border: "1px solid #e6e6e6",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
}));

export const PrettoSlider = styled(Slider)({
  color: "#e68600",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#e68600",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export const ImageButtonBoxGroup = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 350,
  borderRadius: "10px",
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 150,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

export const ImageSrcBoxGroup = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  borderRadius: "10px",
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

export const ImageBoxGroup = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  borderRadius: "10px",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

export const ImageBackdropBoxGroup = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  borderRadius: "10px",
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

export const ImageMarkedBoxGroup = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export const TaskSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#ffad33' : '#ffa31a',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#ffad33',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));