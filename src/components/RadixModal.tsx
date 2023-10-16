import { useState, useEffect } from "react";
import { getCurrentLongLat } from "@/utils/helpers";
import { createClassSession } from "@/utils/apis/sessions";
import { QRCodeOrigin } from "@/utils/interfaces";
import QRCodeModal from "./QRCodeModal";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useQueryClient } from "react-query";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
function toLocalDateTimeString(date: Date): string {
  const pad = (number: number): string =>
    number < 10 ? "0" + number : number.toString();
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function NewSessionModal({ isOpen, onClose }: Props) {
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  //
  const queryClient = useQueryClient();
  // States for display strings
  const [displayStartTime, setDisplayStartTime] = useState<string>("");
  const [displayEndTime, setDisplayEndTime] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [QRCode_data, setQRCode_data] = useState("");

  useEffect(() => {
    if (startTime) {
      const startDateTime = new Date(startTime);
      startDateTime.setMinutes(startDateTime.getMinutes() + 50);
      setEndTime(startDateTime);
      setDisplayEndTime(toLocalDateTimeString(startDateTime));
    }
  }, [startTime]);
  const getCoordinates = async (): Promise<QRCodeOrigin | null> => {
    const coordinates = await getCurrentLongLat();
    if (coordinates) {
      return coordinates;
    }
    throw new Error("Please enable location services and try again");
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const coords = await getCoordinates();
      if (!coords)
        throw new Error("Please enable location services and try again");

      if (!startTime || !endTime)
        throw new Error("Please enter a valid start and end time");
      let dataToSubmit: any = {
        moduleId: "651835453acb0d7dd3434fe0",
        coords,
        startDateTime: startTime,
        endDateTime: endTime,
      };
      const data = await createClassSession(dataToSubmit);
      setQRCode_data(JSON.stringify(data.data));
      setIsQRModalOpen(true);
      queryClient.invalidateQueries(["get-class-sessions"]);
      onClose();
    } catch (error) {
      toast.error((error as Error).message, {
        duration: 5000,
        position: "top-right",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          New Session
        </Dialog.Title>
        <Dialog.Description className="py-4">
          Please enter the session details
        </Dialog.Description>

        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="start-time"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              id="start-time"
              name="start-time"
              value={displayStartTime}
              onChange={(e) => {
                setDisplayStartTime(e.target.value);
                setStartTime(new Date(e.target.value));
              }}
              className="rounded-md border p-2"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="end-time"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="datetime-local"
              id="end-time"
              name="end-time"
              value={displayEndTime}
              onChange={(e) => {
                setDisplayEndTime(e.target.value);
                setEndTime(new Date(e.target.value));
              }}
              className="rounded-md border p-2"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting && <span className="loading loading-spinner"></span>}
            Submit
          </button>
          <Dialog.Close asChild>
            <button type="button" className="btn">
              Close
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
      {/* QR code modal */}
      <QRCodeModal
        id="session_created_qr_modal"
        data={QRCode_data}
        isOpen={isQRModalOpen}
        onClose={() => {
          setIsQRModalOpen(false);
          console.log("closed");
        }}
      />
    </Dialog.Portal>
  );
}
