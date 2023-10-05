// components/QRCodeModal.tsx
import { FC, useEffect } from "react";
import { useQRCode } from "next-qrcode";

interface QRCodeModalProps {
  id: string;
  data: string;
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeModal: FC<QRCodeModalProps> = ({ id, data, isOpen, onClose }) => {
  const { SVG } = useQRCode();

  useEffect(() => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (isOpen && modal) {
      modal.showModal();
    }
    console.log("modal data:", data, id);
  }, [isOpen, id, data]);

  return (
    <dialog id={id} className="modal">
      <div className="flex flex-col justify-center align-center modal-box w-auto">
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

export default QRCodeModal;
