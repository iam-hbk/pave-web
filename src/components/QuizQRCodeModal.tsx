import { FC, useEffect } from "react";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import AttendanceRecord from "./AttendanceRecord";
import { encryptTheQrCode } from "@/utils/helpers";

interface QuizQRCodeModal {
  id: string;
  data: string;
  isOpen: boolean;
  onClose: () => void;
}

const QuizQRCodeModal: FC<QuizQRCodeModal> = ({
  id,
  data,
  isOpen,
  onClose,
}) => {
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
    <dialog id={id} className="modal ">
      <div className="align-center modal-box flex-col justify-center">
        <div>
          <section className="flex flex-1 flex-col items-center">
            <h1 className="text-xl font-bold">
              Scan the QR code to access the quiz
            </h1>
          </section>
          <div className="flex flex-1 flex-col items-center">
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
        </div>
        <div>
          <button
            type="button"
            className="btn ml-2"
            p-10
            onClick={() => {
              const modal = document.getElementById(id) as HTMLDialogElement;
              if (modal) modal.close();
              onClose();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default QuizQRCodeModal;
