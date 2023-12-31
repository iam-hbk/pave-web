import axios from "axios";

export const serverUrl = "https://pave-server.onrender.com";
// export const serverUrl = "https://abutor.serveo.net";


// Create an axios instance
export const apiClient = axios.create({
  baseURL: `${serverUrl}/api`,
  // baseURL: "https://pave-server.onrender.com/api",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  maxBodyLength: Infinity,
});
