import { getClassSessionByLecturerID } from "@/utils/apis/sessions";
import React from "react";
import { useQuery } from "react-query";
import QRCodeModal from "./QRCodeModal";
import { ClassSessionInfo, CreateClassSession } from "@/utils/interfaces";

const CurrentClassSessions = () => {
  const {
    data: result,
    isLoading,
    isError,
  } = useQuery(["sessions-results"], () =>
    getClassSessionByLecturerID("651831d33acb0d7dd3434fde")
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <div>
      {/* {JSON.stringify(result, null, 2)} */}
      {result.sessions.map((session: ClassSessionInfo, index: number) => {
        let sessionData: CreateClassSession = {
          coords: session.qrCodeOrigin,
          endDateTime: new Date(session.classEndTime),
          moduleId: session.module._id,
          startDateTime: new Date(session.classStartTime),
        };
        // return <div key={session._id}>{index}</div>;
        return (
          <ClassSessionComponent
            key={session._id}
            session={session}
            qrCodeData={sessionData}
          />
        );
      })}
    </div>
  );
};

export default CurrentClassSessions;

interface ClassSessionComponentProps {
  qrCodeData: CreateClassSession;
  session: ClassSessionInfo;
}
function ClassSessionComponent({
  session,
  qrCodeData,
}: ClassSessionComponentProps) {
  const [isQrModalOpen, setIsQrModalOpen] = React.useState(false);

  return (
    <section key={session._id} className="mb-6">
      <QRCodeModal
        id={session._id}
        data={JSON.stringify(qrCodeData)}
        isOpen={isQrModalOpen}
        onClose={() => {}}
      />
      <div className="p-4 bg-gray-200 rounded-lg mb-4 space-x-4 hover:shadow-lg transition-shadow duration-300">
        <div className="flex gap-3 items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold">{session.module.moduleName}</h3>
            <p>Start Time: {formatDateString(session.classEndTime)}</p>
            <p>End Time: {formatDateString(session.classEndTime)}</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsQrModalOpen(true);
            }}
          >
            View QR Code
          </button>
          <button className="btn btn-error">Delete</button>
        </div>
        {/* <table className="w-full table-fixed">
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-2">Student Name</th>
              <th className="w-1/4 px-4 py-2">Joined At</th>
            </tr>
          </thead>
          <tbody>
            {["Alice", "Bob", "Charlie"].map((student, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{student}</td>
                <td className="border px-4 py-2">09:05 AM</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </section>
  );
}

function formatDateString(dateString: string): string {
  const date = new Date(dateString);

  const optionsDay: Intl.DateTimeFormatOptions = { weekday: "long" };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const day = new Intl.DateTimeFormat("en-US", optionsDay).format(date);
  const time = date.toLocaleTimeString("en-US", optionsTime);

  const formattedDate = `${day} at ${time}`;

  return formattedDate;
}
