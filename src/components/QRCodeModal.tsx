// components/QRCodeModal.tsx
import { FC, useEffect } from "react";
import { useQRCode } from "next-qrcode";
import Image from "next/image";

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
      <div className="flex flex-col justify-center align-center modal-box min-w-[80vw] w-[80vw]">
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
          <section className="flex flex-1 items-center flex-col">
            <h1 className="text-2xl font-bold">Attendance Recorded</h1>
            <p className="text-lg">Students can now join the class session</p>
            <table className="table-auto border border-gray-200 mx-2 bg-white   w-full">
              <thead>
                <tr className="text-center">
                  <th className="px-4 py-2">Student Name</th>
                  <th className="px-4 py-2">Attendance Time</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace this part with your dynamic data */}
                {["heritier kaumbu", "kenan malale", "sanah rasethaba"].map((student, idx) => (
                  <tr
                    key={idx}
                    className="text-center hover:bg-secondary hover:text-secondary-content  transition-shadow duration-300"
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center">
                        <Image
                          width={40}
                          height={40}
                          src="https://via.placeholder.com/40"
                          alt={student}
                          className="rounded-full mr-2"
                        />
                        {student}
                      </div>
                    </td>
                    <td className="px-4 py-2">09:05 AM</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
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
