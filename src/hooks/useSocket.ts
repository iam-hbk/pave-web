import { useEffect, useState } from "react";
import { getSocket } from "@/utils/apis/socket";
import {
  BaseChangeEvent,
  isInsertChangeEvent,
  isUpdateChangeEvent,
  isDeleteChangeEvent,
} from "@/utils/interfaces/socket";
import { toast } from "sonner";
import { formatDateString } from "@/utils/helpers";
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
    // socket.on(event, (data: BaseChangeEvent) => {
    socket.on(event, (data: any) => {
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
      toast.success(
        `${data.studentName} signed the register at ${formatTimeToGMTPlus2(
          data.scanTime,
        )}`,
        {
          duration: 5000,
          position: "top-right",
          important: true,
        },
      );
    });

    // Remove the event listener when the component unmounts
    return () => {
      socket.off(event);
    };
  });
};

export default useSocket;

export function formatTimeToGMTPlus2(dateString: string) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Convert to GMT+2 timezone by adding 2 hours (2 * 60 minutes * 60 seconds * 1000 milliseconds)
  const dateInGMTPlus2 = new Date(date.getTime() + 2 * 60 * 60 * 1000);

  // Use Intl.DateTimeFormat to format the time
  const formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Etc/GMT-2",
  });
  const timeString = formatter.format(dateInGMTPlus2);

  return `${timeString}`;
}
