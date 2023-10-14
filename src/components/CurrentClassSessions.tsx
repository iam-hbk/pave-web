import { getClassSessionByLecturerID } from "@/utils/apis/sessions";
import React from "react";
import {
  BaseChangeEvent,
  isInsertChangeEvent,
  isUpdateChangeEvent,
} from "@/utils/interfaces/socket";
import { useQuery } from "react-query";
import QRCodeModal from "./QRCodeModal";
import { ClassSessionInfo, CreateClassSession } from "@/utils/interfaces";
import useSocket from "@/hooks/useSocket";
import { BiErrorCircle } from "react-icons/bi";
import { formatDateString } from "@/utils/helpers";

const CurrentClassSessions = () => {
  const {
    data: result,
    isLoading,
    isError,
    refetch,
  } = useQuery(["sessions-results"], () =>
    getClassSessionByLecturerID("651831d33acb0d7dd3434fde"),
  );
  const [newSessions, setNewSessions] = React.useState<string[]>([]);
  const [updatedSessions, setUpdatedSessions] = React.useState<string[]>([]);

  const newSessionData = useSocket("newClassSession", () => {
    refetch();
  });

  React.useEffect(() => {
    if (newSessionData) {
      console.log("new data", newSessionData);
      if (isInsertChangeEvent(newSessionData)) {
        setNewSessions((prev) => [...prev, newSessionData.id]);
      } else if (isUpdateChangeEvent(newSessionData)) {
        setUpdatedSessions((prev) => [...prev, newSessionData.id]);
      }
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
      {/* Sort the sessions by date of creation from the newest to the oldest */}
      {result.sessions
        .sort((a: ClassSessionInfo, b: ClassSessionInfo) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })
        .map((session: ClassSessionInfo) => {
          let sessionData: CreateClassSession = {
            _id: session._id,
            qrCodeOrigin: session.qrCodeOrigin,
            classEndTime: new Date(session.classEndTime),
            module: session.module,
            classStartTime: new Date(session.classStartTime),
          };

          return (
            <ClassSessionComponent
              key={session._id}
              session={session}
              qrCodeData={sessionData}
              isNew={newSessions.includes(session._id)}
              wasUpdated={updatedSessions.includes(session._id)}
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
  isNew: boolean;
  wasUpdated: boolean;
}
function ClassSessionComponent({
  session,
  qrCodeData,
  isNew,
  wasUpdated,
}: ClassSessionComponentProps) {
  const [isQrModalOpen, setIsQrModalOpen] = React.useState(false);
  const handleModalClose = () => {
    setIsQrModalOpen(false);
  };

  // flag to check if the session is new using the createdAt field on the session
  // using a time difference of 5 minutes
  const isNewTime =
    new Date().getTime() - new Date(session.createdAt).getTime() <
    5 * 60 * 1000;
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
      {/* Add a "New" badge if the session is new */}
      {(isNew || isNewTime) && (
        <span className="absolute right-[-5px] top-[-5px] rounded-md bg-success px-2 py-1 text-xs font-bold text-white">
          New
        </span>
      )}
      {/* Add an "Updated" badge if the session was updated */}
      {wasUpdated && (
        <span className="absolute right-[-5px] top-[-15px] rounded-md bg-info px-2 py-1 text-xs font-bold text-white">
          Updated
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

