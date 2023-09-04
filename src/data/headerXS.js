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

export const dataHeader1 = [
  {
    id: 1,
    name: "home",
    route: routesConfig.home,
    iconFill: <MdHome size={25} color={Colors.primary} />,
    iconOutline: <MdOutlineHome size={25} color={Colors.icon} />,
  },
  {
    id: 2,
    name: "Package",
    route: routesConfig.package,
    iconFill: <MdPersonAddAlt1 size={25} color={Colors.primary} />,
    iconOutline: <MdPersonAddAlt size={25} color={Colors.icon} />,
  },
  {
    id: 3,
    name: "Stock",
    route: routesConfig.stock,
    iconFill: <MdInventory2 size={25} color={Colors.primary} />,
    iconOutline: <MdOutlineInventory2 size={25} color={Colors.icon} />,
  },
  {
    id: 4,
    name: "Chat",
    route: routesConfig.chatGr,
    iconFill: <MdChat size={25} color={Colors.primary} />,
    iconOutline: <MdOutlineChat size={25} color={Colors.icon} />,
  },
  {
    id: 5,
    name: "Group",
    route: routesConfig.group,
    iconFill: <MdGroups2 size={25} color={Colors.primary} />,
    iconOutline: <MdOutlineGroups2 size={25} color={Colors.icon} />,
  },
  {
    id: 6,
    name: "Shopping",
    route: routesConfig.shopping,
    iconFill: <MdShoppingCart size={25} color={Colors.primary} />,
    iconOutline: <MdOutlineShoppingCart size={25} color={Colors.icon} />,
  },
];
