import { useSelector } from "react-redux";

import { io } from "socket.io-client";

function SockectIO() {
  const URL = "https://megoo.103-97-124-110.flashvps.xyz";
  const user = useSelector((state) => state?.auth.login?.currentUser);

  const token = user?.data.userInfo._id;

  const socket = new io(URL, {
    autoConnect: false,
    path: "/ws/",
    query: { token },
    // withCredentials: true
  });

  return socket;
}

export default SockectIO;
