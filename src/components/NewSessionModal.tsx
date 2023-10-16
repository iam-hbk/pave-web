import { useState, useEffect } from "react";
import { getCurrentLongLat } from "@/utils/helpers";
import { createClassSession } from "@/utils/apis/sessions";
import { QRCodeOrigin } from "@/utils/interfaces";
import QRCodeModal from "./QRCodeModal";
import { string } from "yup";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function NewSessionModal({ isOpen, onClose }: Props) {
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [coords, setCoords] = useState<QRCodeOrigin>();
  const [submitting, setSubmitting] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [QRCode_data, setQRCode_data] = useState("");

  useEffect(() => {
    if (startTime) {
      const startDateTime = new Date(startTime);
      startDateTime.setMinutes(startDateTime.getMinutes() + 50);
      setEndTime(startDateTime);
    }
  }, [startTime]);
  const getCoordinates = async () => {
    const coordinates = await getCurrentLongLat();
    if (coordinates) {
      setCoords(coordinates);
    }
  };

  const handleSubmit = async () => {
    await getCoordinates();
    if (!coords) return alert("Please enable location services and try again");

    try {
      setSubmitting(true);
      let dataToSubmit: any = {
        moduleId: "651835453acb0d7dd3434fe0",
        coords,
        startDateTime: startTime,
        endDateTime: endTime,
      };
      const data = await createClassSession(dataToSubmit);
      setQRCode_data(JSON.stringify(data.data));
      setIsQRModalOpen(true);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="z-50">
      <dialog open={isOpen} className="modal z-50">
        <div className="modal-box z-50 border-2 shadow-2xl">
          <h3 className="text-lg font-bold">New +++Session</h3>
          <p className="py-4">Please enter the details</p>

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
                value={startTime?.toLocaleString()}
                // value={getLocalISOString(startTime) || ""}
                onChange={(e) => {
                  setStartTime(new Date(e.target.value));
                  console.log("start time", startTime);
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
                value={endTime?.toISOString().slice(0, 16) || ""}
                onChange={(e) => setEndTime(new Date(e.target.value))}
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
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </dialog>
      {/* QR code modal */}
      <QRCodeModal
        id="qr_created_session_modal"
        data={QRCode_data}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
}
function getLocalISOString(inputDate?: string | Date): string {
  console.log("inputDate", inputDate);
  const date: Date = inputDate ? new Date(inputDate) : new Date();
  const offset: number = date.getTimezoneOffset();
  const absOffset: number = Math.abs(offset);
  const sign: string = offset < 0 ? "+" : "-";
  const pad = (number: number): string =>
    number < 10 ? "0" + number : number.toString();
  const offsetString: string = `${sign}${pad(Math.floor(absOffset / 60))}:${pad(
    absOffset % 60,
  )}`;

  return (
    new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16) +
    offsetString
  );
}
