import useSocket from "@/hooks/useSocket";
import { getAttendanceBySessionId } from "@/utils/apis/sessions";
import Image from "next/image";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { useQuery } from "react-query";

type Props = {
  sessionId: string;
};

const AttendanceRecord = ({ sessionId }: Props) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ["attendance-register"],
    () => getAttendanceBySessionId(sessionId),
  );

  const newSessionData = useSocket("newAttendance", () => {
    alert("new attendance");
    refetch();
  });

  if (isLoading)
    return (
      <div className="grid w-full place-items-center p-5">
        <span className="loading loading-bars loading-lg text-primary text-opacity-50"></span>
      </div>
    );

  if (isError) return;
  <div className="flex w-full content-center items-center gap-3 rounded-md bg-info bg-opacity-30 p-5 text-lg text-info-content ">
    <BiErrorCircle />
    <p className="text-center ">An Error Ocurred !</p>
  </div>;
  if (!data || data.length === 0)
    return (
      <div className="flex w-full content-center items-center gap-3 rounded-md bg-info bg-opacity-30 p-5 text-lg text-info-content ">
        <BiErrorCircle />
        <p className="text-center ">No Attendance Record Found !</p>
      </div>
    );
  return (
    <div>
      DATA-Length:{data.length}
      {"\n"}
      {JSON.stringify(data)}
    </div>
  );

  return (
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
                className="m-2 text-center transition-shadow duration-300 hover:bg-secondary-content hover:text-secondary"
              >
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <Image
                      width={40}
                      height={40}
                      src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80"
                      alt={student}
                      className="mr-2 h-[40px] w-[40px] rounded-full"
                    />
                    <p className="flex-1  text-center capitalize">{student}</p>
                  </div>
                </td>
                <td className="px-4 py-2">09:05 AM</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRecord;
