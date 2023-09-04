import {
  MdHome,
  MdOutlineHome,
  MdInventory2,
  MdOutlineInventory2,
  MdPersonAddAlt1,
  MdPersonAddAlt,
  MdChat,
  MdOutlineChat,
  MdGroups2,
  MdOutlineGroups2,
  MdShoppingCart,
  MdOutlineShoppingCart,
} from "react-icons/md";
import routesConfig from "../config/routes";
import { Colors } from "../config/Colors";

export const dataHeader2 = [
  {
    id: 1,
    name: "home",
    title: "Trang chủ",
    route: routesConfig.home,
    iconFill: <MdHome size={35} color={Colors.primary} />,
    iconOutline: <MdOutlineHome size={35} color={Colors.icon} />,
  },
  {
    id: 2,
    name: "Package",
    title: "Gói dịch vụ",
    route: routesConfig.package,
    iconFill: <MdPersonAddAlt1 size={35} color={Colors.primary} />,
    iconOutline: <MdPersonAddAlt size={35} color={Colors.icon} />,
  },
  {
    id: 3,
    name: "Stock",
    title: "Kho lưu trữ",
    route: routesConfig.stock,
    iconFill: <MdInventory2 size={35} color={Colors.primary} />,
    iconOutline: <MdOutlineInventory2 size={35} color={Colors.icon} />,
  },
  {
    id: 4,
    name: "Chat",
    title: "Group chat",
    route: routesConfig.chatGr,
    iconFill: <MdChat size={35} color={Colors.primary} />,
    iconOutline: <MdOutlineChat size={35} color={Colors.icon} />,
  },
  {
    id: 5,
    name: "Group",
    title: "Group",
    route: routesConfig.group,
    iconFill: <MdGroups2 size={25} color={Colors.primary} />,
    iconOutline: <MdOutlineGroups2 size={25} color={Colors.icon} />,
  },
  {
    id: 6,
    name: "Shopping",
    title: "Giỏ hàng",
    route: routesConfig.shopping,
    iconFill: <MdShoppingCart size={25} color={Colors.primary} />,
    iconOutline: <MdOutlineShoppingCart size={25} color={Colors.icon} />,
  },
];
