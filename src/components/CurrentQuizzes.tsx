"use client";

import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiTimer } from "react-icons/ci";
import { PiStudentThin } from "react-icons/pi";
import { useQuery } from "react-query";
import { getQuizByModuleId } from "@/utils/apis/quiz";
import { formatDateString } from "@/utils/helpers";
import Quiz from "@/app/dashboard/quiz/form/page";
import QuizQRCodeModal from "./QuizQRCodeModal";
const isRecent = (createdAt: Date) => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return new Date(createdAt) >= fiveMinutesAgo;
};
type Props = {};

export const CurrentQuizzes: React.FC = () => {
  const [isQrModalOpen, setIsQrModalOpen] = React.useState(false);
  const [currentQuizId, setCurrentQuizId] = React.useState("");

  const {
    data: quizzes,
    isLoading,
    error,
  } = useQuery(["getQuizzes"], () =>
    getQuizByModuleId("651835453acb0d7dd3434fe0"),
  );

  if (isLoading)
    return <span className="loading loading-bars text-primary"></span>;
  if (error)
    return (
      <span className="text-error">
        Something went wrong, please try again later
      </span>
    );
  if (!quizzes) return <span className="text-error">No quizzes found</span>;

  return (
    <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <QuizQRCodeModal
        id="QuizQR"
        data={currentQuizId}
        isOpen={isQrModalOpen}
        onClose={() => {
          setIsQrModalOpen(false);
        }}
      />

      {quizzes.map((quiz, index) => (
        <div
          key={index}
          className="transform rounded-lg bg-gray-100 p-4 pt-2 transition-all duration-300 hover:shadow-lg"
        >
          <div className="mb-3 flex items-center justify-between">
            <div
              className={`badge badge-neutral badge-outline rounded-md p-4 text-base ${
                isRecent(quiz.createdAt) ? "border-success" : ""
              }`}
            >
              IFS3A
            </div>
            <div className="dropdown-left dropdown-bottom dropdown hover:text-primary-focus ">
              <label
                tabIndex={0}
                className="btn btn-xs h-9 w-9 rounded-full bg-none text-lg"
              >
                <BiDotsVerticalRounded />
              </label>
              <div
                tabIndex={0}
                className="menu dropdown-content z-10  w-10 gap-1"
              >
                {/* <li> */}
                <button className="btn btn-primary btn-xs ">View</button>
                {/* </li> */}
                {/* <li> */}
                <button className="btn btn-info btn-outline btn-xs">
                  Edit
                </button>
                {/* </li>
                  <li> */}
                <button className="btn btn-error btn-xs">Delete</button>
                {/* </li> */}
              </div>
            </div>
          </div>
          <h3 className="mb-2 text-xl font-semibold capitalize text-gray-800">
            {quiz.title}
          </h3>
          <div className="mb-2 flex items-center space-x-2 text-gray-700">
            <span className="flex items-center space-x-1">
              <PiStudentThin />
              <span>{quiz.numberOfStudentsThatAttemptedQuiz} Students</span>
            </span>

            <span
              className={`rounded p-1 text-xs ${
                quiz.isActive
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              }`}
            >
              {quiz.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="mb-3 flex items-center gap-2 text-gray-700">
            <CiTimer />
            <span>
              Expires on <b>{formatDateString(quiz.expiresAt)}</b>
            </span>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              console.log("opening modal...");

              setCurrentQuizId(quiz._id);
              setIsQrModalOpen(true);
            }}
          >
            View QR Code
          </button>
        </div>
      ))}
    </section>
  );
};
