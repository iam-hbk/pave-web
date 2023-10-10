import React from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const Page = (props: Props) => {
  const quizzes = [
    {
      title: "C# Windows Forms",
      respondents: 25,
      isActive: true,
      expiryDate: "2023-12-31",
    },
    {
      title: "Data structures and algorithms",
      respondents: 10,
      isActive: false,
      expiryDate: "2023-11-15",
    },
    {
      title: "Data structures and algorithms",
      respondents: 10,
      isActive: false,
      expiryDate: "2023-11-15",
    },
    {
      title: "Data structures and algorithms",
      respondents: 10,
      isActive: false,
      expiryDate: "2023-11-15",
    },
  ];
  return (
    <div className="h-fit p-10 ">
      <h1 className="mb-6 text-2xl font-bold">Create a new quiz</h1>
      <section className="mb-10 grid grid-cols-1 gap-6 text-white md:grid-cols-2">
        <Link
          href="./quiz/form"
          className="bordered card bg-gradient-to-tr from-primary to-purple-600 transition-all duration-1000 hover:from-yellow-100 hover:to-primary hover:text-primary-content hover:shadow-lg"
        >
          <figure>
            <Image
              src="/assets/svgs/form.svg"
              width={130}
              height={130}
              alt="Form sheet"
            />
          </figure>
          <div className="card-body transition-none">
            <h2 className="card-title">Using a Form sheet</h2>
            <p>
              Create a quiz manually by using a form and setting your own
              questions.
            </p>
          </div>
        </Link>
        <Link
          className="bordered card bg-gradient-to-tr from-info to-secondary transition-all duration-300 hover:from-purple-400  hover:to-blue-600 hover:text-info-content hover:shadow-lg"
          href="./quiz/wizard"
        >
          <figure>
            <Image
              src="/assets/svgs/wizard.svg"
              width={130}
              height={120}
              alt="Form wizard"
            />
          </figure>
          <div className="card-body transition-none">
            <h2 className="card-title">Using the Form wizard</h2>
            <p>
              Upload your course material and let Pave AI generate a quiz for
              you.
            </p>
          </div>
        </Link>
      </section>
      <h1 className="mb-6 text-2xl font-bold">Your Quizzes</h1>
      <section className="mb-10 grid grid-cols-1 gap-6">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="inset-0 transform  rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:bg-info hover:bg-opacity-10"
          >
            <h3 className="mb-4 text-2xl font-bold capitalize text-gray-800">
              {quiz.title}
            </h3>
            <div className="mb-4 flex items-center space-x-2">
              <span className="rounded-sm bg-gray-200 p-3 text-sm text-gray-600">
                {quiz.respondents} Students enrolled
              </span>
              <span
                className={`rounded-sm p-3 text-sm ${
                  quiz.isActive
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {quiz.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex w-full items-center justify-between ">
              <p className="border-l-4 border-blue-500 py-2 pl-4 text-gray-600">
                Expires on: {quiz.expiryDate}
              </p>
              <div className="flex gap-5 self-end">
                <button className="btn btn-primary">View</button>
                <button className="btn btn-secondary btn-outline">Edit</button>
                <button className="btn btn-error">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Page;
