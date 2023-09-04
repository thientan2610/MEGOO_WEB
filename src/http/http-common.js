import axios from "axios";

export const API_HOST = "https://megoo.103-97-124-110.flashvps.xyz/be/api";
export const WEB_HOST = "https://megoo.netlify.app";

export default axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-type": "application/json",
  },
});

