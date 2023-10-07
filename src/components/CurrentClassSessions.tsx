import { getClassSessionByLecturerID } from "@/utils/apis/sessions";
import React from "react";
import { useQuery } from "react-query";
import QRCodeModal from "./QRCodeModal";
import { ClassSessionInfo, CreateClassSession } from "@/utils/interfaces";
import useSocket from "@/hooks/useSocket";
import { BiErrorCircle } from "react-icons/bi";

const CurrentClassSessions = () => {
  const {
    data: result,
    isLoading,
    isError,
    refetch,
  } = useQuery(["sessions-results"], () =>
    getClassSessionByLecturerID("651831d33acb0d7dd3434fde"),
  );

  const newSessionData = useSocket("newClassSession", () => {
    refetch();
  });

  React.useEffect(() => {
    if (newSessionData) {
      console.log("new session data", newSessionData);
    }
  }, [newSessionData]);
  if (isLoading)
    return (
      <div className="grid w-full place-items-center p-5">
        <span className="loading loading-bars loading-lg text-primary text-opacity-50"></span>
      </div>
    );
  if (isError)
    return (
      <section className="flex flex-col gap-2 text-error text-opacity-90">
        {/* <h1 className="text-xl ">No Class Session Found !</h1> */}
        <div className="flex w-full content-center items-center gap-3 rounded-md bg-info bg-opacity-30 p-5 text-lg text-info-content ">
          <BiErrorCircle />
          <p className="text-center ">
            When you create a class session, you will see it here.
          </p>
        </div>
      </section>
    );
  return (
    <div>
      {result.sessions.map((session: ClassSessionInfo) => {
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
  const handleModalClose = () => {
    setIsQrModalOpen(false);
  };

  // Assuming session.creationTime is a Date object or an ISO string
  const creationTime = new Date(session.updatedAt);
  const currentTime = new Date();
  const timeDifferenceMinutes =
    (currentTime.getTime() - creationTime.getTime()) / (1000 * 60);

  return (
    <section key={session._id} className="relative mb-6">
      {" "}
      {/* relative positioning */}
      <QRCodeModal
        id={session._id}
        data={JSON.stringify(qrCodeData)}
        isOpen={isQrModalOpen}
        onClose={handleModalClose}
      />
      {/* Add a "New" badge if the session was created less than 10 min ago */}
      {timeDifferenceMinutes < 10 && (
        <span className="absolute right-[-5px] top-[-5px] rounded-md bg-success px-2 py-1 text-xs font-bold text-white">
          New
        </span>
      )}
      <div className="mb-4 space-x-4 rounded-lg bg-gray-200 p-4 transition-shadow duration-300 hover:shadow-lg">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-bold">{session.module.moduleName}</h3>
            <p>Start Time: {formatDateString(session.classStartTime)}</p>
            <p>End Time: {formatDateString(session.classEndTime)}</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsQrModalOpen(true);
              console.log("opening modal...");
            }}
          >
            View QR Code
          </button>
          <button className="btn btn-error">Delete</button>
        </div>
      </div>
    </section>
  );
}

function formatDateString(dateString: string): string {
  const date = new Date(dateString); // Convert string to Date object

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
