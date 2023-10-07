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
            <div className="mx-2 max-h-[50vh] w-full  bg-white duration-300 ">
              <table className="mx-2 w-full  table-auto bg-white">
                <thead>
                  <tr className="text-center">
                    <th className="px-4 py-2">Student Name</th>
                    <th className="px-4 py-2">Attendance Time</th>
                  </tr>
                </thead>
                <tbody className="">
                  {/* Replace this part with your dynamic data */}
                  {["heritier kaumbu", "kenan malale", "sanah rasethaba"].map(
                    (student, idx) => (
                      <tr
                        key={idx}
                        className="m-2 text-center transition-shadow duration-300                      hover:bg-secondary-content hover:text-secondary"
                      >
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <Image
                              width={40}
                              height={40}
                              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80"
                              alt={student}
                              className="mr-2 rounded-full w-[40px] h-[40px]"
                            />
                            <p className="flex-1  text-center capitalize">
                              {student}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2">09:05 AM</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
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
