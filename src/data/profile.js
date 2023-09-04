import {
  BsPersonBoundingBox,
  BsFillLockFill,
  BsFillInfoSquareFill,
} from "react-icons/bs";
import { TbPackage, TbSettings, TbLogout } from "react-icons/tb";

import PersonalInformation from "../features/Profile/PersonalInformation";
import ChangePassword from "../features/Profile/ChangePassword";
import MyPackage from "../features/Profile/MyPackage";
import Setting from "../features/Profile/Setting";
import InformationRulers from "../features/Profile/InformationRulers";

const profile = [
  {
    _id: 1,
    icon: <BsPersonBoundingBox size={20} />,
    name: "Thông tin cá nhân",
    action: <PersonalInformation />,
  },
  {
    _id: 2,
    icon: <BsFillLockFill size={20} />,
    name: "Đổi mật khẩu",
    action: <ChangePassword />,
  },
  {
    _id: 3,
    icon: <BsFillInfoSquareFill size={20} />,
    name: "Thông tin & quyền",
    action: <InformationRulers />,
  },
  // {
  //   _id: 4,
  //   icon: <TbPackage size={20} />,
  //   name: "Tùy chọn quảng cáo",
  //   action: <ChangePassword />,
  // },
  {
    _id: 5,
    icon: <TbPackage size={20} />,
    name: "Gói của tôi",
    action: <MyPackage />,
  },
  {
    _id: 6,
    icon: <TbSettings size={20} />,
    name: "Cài đặt thông báo",
    action: <Setting />,
  },
];

export default profile;
