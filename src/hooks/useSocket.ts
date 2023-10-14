

import { useEffect, useState } from "react";
import { getSocket } from "@/utils/apis/socket";
import {
  BaseChangeEvent,
  isInsertChangeEvent,
  isUpdateChangeEvent,
  isDeleteChangeEvent,
} from "@/utils/interfaces/socket";
interface SocketCallback<SocketReturnType> {
  (data: SocketReturnType): void;
}

const useSocket = (
  event: string,
  callback: SocketCallback<BaseChangeEvent>,
) => {
  const [data, setData] = useState<BaseChangeEvent>();

  useEffect(() => {
    const socket = getSocket();

    // Set up the event listener
    socket.on(event, (data: BaseChangeEvent) => {
      console.log("EVENT:::", event);
      setData(data);
      console.log("Data:::", data);

      // Handle different types of change events
      if (isInsertChangeEvent(data)) {
        // Handle insert event
        console.log("Received an insert event");
      } else if (isUpdateChangeEvent(data)) {
        // Handle update event
        console.log("Received an update event");
      } else if (isDeleteChangeEvent(data)) {
        // Handle delete event
        console.log("Received a delete event");
      }

      callback(data);
    });

    // Remove the event listener when the component unmounts
    return () => {
      socket.off(event);
    };
  }, [event, callback]);

  return data;
};

export default useSocket;
