'use client'

import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import StudentList from "@/components/StudentList";
import { getCurrentLongLat } from "@/utils/helpers";
import QRCodeModal from "@/components/QRCodeModal";
import { createClassSession } from "@/utils/apis/sessions";
import { QRCodeOrigin } from "@/utils/interfaces";
import CurrentClassSessions from "@/components/CurrentClassSessions";
import Link from "next/link";

export default function Home() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [coords, setCoords] = useState<QRCodeOrigin>(); // [lat, long

  const [QRCode_data, setQRCode_data] = useState("");
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState(false);
  const getCoordinates = async () => {
    const coordinates = await getCurrentLongLat();
    if (coordinates) {
      setCoords(coordinates);
    }
  };
  const handleSubmit = async () => {
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);
    await getCoordinates();
    if (!coords) return alert("Please enable location services and try again");

    try {
      setSubmitting(true);
      let dataToSubmit: any = {
        moduleId: "651835453acb0d7dd3434fe0",
        coords,
        startDateTime,
        endDateTime,
      };
      const data = await createClassSession(dataToSubmit);
      setQRCode_data(JSON.stringify(data.data));

      const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
      modal.close();
      setIsQRModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100  transition-all duration-300">
      <Head>
        <title>Dashboard</title>
      </Head>
      {/* New session modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">New Session</h3>
          <p className="py-4">Please enter the details</p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="start-time"
                className="block text-sm font-medium text-gray-700"
              >
                Class Start Time
              </label>
              <input
                type="datetime-local"
                id="start-time"
                name="start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1 w-full rounded-md border p-2"
              />
            </div>

            <div>
              <label
                htmlFor="end-time"
                className="block text-sm font-medium text-gray-700"
              >
                Class End Time
              </label>

              <input
                type="datetime-local"
                id="end-time"
                name="end-time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-1 w-full rounded-md border p-2"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <button
              type="submit"
              className={`btn btn-primary `}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting && <span className="loading loading-spinner"></span>}
              Submit
            </button>
            <button
              type="button"
              className="btn ml-2"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_1",
                ) as HTMLDialogElement;
                if (modal) modal.close();
              }}
            >
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
        onClose={() => {}}
      />

      {/* Main Content */}
      <main className="flex flex-1 flex-col gap-5 p-6 transition-all duration-300 lg:flex-row lg:gap-1">
        <div className="mr-4 w-2/3 rounded-xl bg-white p-6 shadow-md">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="text-gray-500">Dr Fanie Radebe</div>
              <Link
                href={"/dashboard/quiz"}
                className="btn btn-primary transition-all duration-300 hover:shadow-lg"
              >
                New quiz
              </Link>
            </div>
          </div>

          {/* Upcoming Quizzes */}
          <section className="mb-6">
            <h2 className="mb-4 text-lg font-semibold">Upcoming quizzes</h2>
            {[1, 2].map((quiz, idx) => (
              <div
                key={idx}
                className="mb-4 flex items-center justify-between space-x-4 rounded-lg bg-gray-200 p-4 transition-shadow duration-300 hover:shadow-lg"
              >
                <Image
                  width={100}
                  height={100}
                  className="h-20 w-20 rounded object-cover"
                  src="https://images.unsplash.com/photo-1662120455989-5a433cec9980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1914&q=80"
                  alt="Quiz Image"
                />
                <div className="flex-1">
                  <h3 className="font-medium">Quiz Title</h3>
                  <p>12/03/2023 | 09:00 AM</p>
                  <p>No. of students enrolled: 32</p>
                </div>
                <button className="btn btn-primary">Open</button>
              </div>
            ))}
          </section>

          {/* Completed Quizzes */}
          <section className="mb-6">
            <h2 className="mb-4 text-lg font-semibold">Completed Quizzes</h2>
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="w-1/4 px-4 py-2">Title</th>
                  <th className="w-1/4 px-4 py-2">Group name</th>
                  <th className="w-1/4 px-4 py-2">No. of persons</th>
                  <th className="w-1/4 px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {["Assembly language", "C programming", "Python"].map(
                  (quiz, idx) => (
                    <tr key={idx}>
                      <td className="border px-4 py-2">{quiz}</td>
                      <td className="border px-4 py-2">Group {idx + 1}</td>
                      <td className="border px-4 py-2">
                        {(idx + 1) * 10} persons
                      </td>
                      <td className="border px-4 py-2">12/02/2023</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </section>

          {/* Current Class Sessions */}
          <h2 className="mb-4 text-lg font-semibold">Current Class Sessions</h2>

          <CurrentClassSessions />
        </div>

        {/* Students List */}
        <StudentList />
      </main>
    </div>
  );
}
