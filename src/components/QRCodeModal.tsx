
import { FC, useEffect } from "react";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import AttendanceRecord from "./AttendanceRecord";
import { encryptTheQrCode } from "@/utils/helpers";

interface QRCodeModalProps {
  id: string;
  data: string;
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeModal: FC<QRCodeModalProps> = ({ id, data, isOpen, onClose }) => {
  const { SVG } = useQRCode();
  // data = encryptTheQrCode(data);

  useEffect(() => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (isOpen && modal) {
      modal.showModal();
    }
    // console.log("modal-data", data ?? JSON.stringify(JSON.parse(data), null, 2));
  }, [isOpen, id, data]);

  return (
    <dialog id={id} className="modal">
      <div className="align-center modal-box flex w-[80vw] min-w-[80vw] flex-col justify-center">
        <div className="flex flex-row">
          <div>
            {data && data.length > 0 && (
              <SVG
                text={data}
                options={{
                  margin: 2,
                  width: 300,
                  color: {},
                }}
              />
            )}
          </div>
          <section className="flex flex-1 flex-col items-center">
            <h1 className="text-2xl font-bold">Attendance Recorded</h1>
            <p className="text-lg">Students can now join the class session</p>
            <AttendanceRecord sessionId={id} />
          </section>
        </div>
        <div>
          <button
            type="button"
            className="btn ml-2"
            p-10
            onClick={() => {
              // onClose();
              // const modal = document.getElementById(id) as HTMLDialogElement;
              // if (modal) modal.close();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default QRCodeModal;
