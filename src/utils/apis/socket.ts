import { io, Socket } from "socket.io-client";

const serverUrl = "http://localhost:4001";

let socket: Socket | null = null;

export const connectSocket = (): void => {
  console.log("Connecting socket...");
  if (!socket) {
    socket = io(serverUrl, {
      autoConnect: true,
      // ... other socket.io options as needed
    });
    console.log("Initialized socket.");
  }
};

export const getSocket = (): Socket => {
  if (!socket) {
    // throw new Error("Socket not initialized. Call connectSocket first.");
    socket = io(serverUrl, {
      autoConnect: true,
      // ... other socket.io options as needed
    });
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) socket.disconnect();
};
