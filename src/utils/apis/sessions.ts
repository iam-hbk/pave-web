import axios from "axios";
import { CreateClassSession } from "../interfaces";

// Create an axios instance
const apiClient = axios.create({
  baseURL: "https://pave-server.onrender.com/api",
  // baseURL: "https://pave-server.onrender.com/api",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  maxBodyLength: Infinity,
});

export async function getClassSessionByLecturerID(lecturerId: string) {
  try {
    const response = await apiClient.get(
      `/class-session/lecturer/${lecturerId}`,
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request data:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    throw error; // Re-throw the error if you want to handle it in the calling code
  }
}
export async function createClassSession({
  moduleId,
  coords,
  startDateTime,
  endDateTime,
}: any) {
  try {
    const response = await apiClient.post("/class-session/create", {
      module: moduleId,
      qrCodeOrigin: coords || { lat: 40.73061, long: -73.935242 },
      classStartTime: startDateTime.toISOString(),
      classEndTime: endDateTime.toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAttendanceBySessionId(sessionId: string) {
  try {
    const response = await apiClient.get(`/attendance/session/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
