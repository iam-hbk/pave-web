import { Socket } from 'socket.io-client';
// useSocket.ts
import { useEffect, useState } from "react";
import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from "@/utils/apis/socket";

interface SocketCallback<SocketReturnType> {
  (data: SocketReturnType): void;
}

const useSocket = <SocketReturnType>(
  event: string,
  callback: SocketCallback<SocketReturnType>,
) => {
  const [data, setData] = useState<SocketReturnType>();
  useEffect(() => {
    connectSocket();

    const socket = getSocket();

    // Set up the event listener
    socket.on(event, (data: SocketReturnType) => {
      console.log("EVENT:::",event)
      setData(data);
      console.log("Data:::", data);
      callback(data);
    });

    // Remove the event listener and disconnect the socket when the component unmounts
    return () => {
      socket.off(event);
      disconnectSocket();
    };
  }, [event, callback]);

  return data;
};

export default useSocket;
