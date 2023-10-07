import { io, Socket } from "socket.io-client";

const serverUrl = "https://pave-server.onrender.com";

let socket: Socket | null = null;

export const connectSocket = (): void => {
  if (!socket) {
    socket = io(serverUrl, {
      autoConnect: true,
      // ... other socket.io options as needed
    });
  }
};

export const getSocket = (): Socket => {
  if (!socket)
    throw new Error("Socket not initialized. Call connectSocket first.");
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) socket.disconnect();
}
