"use client"; // This is a client component 👈🏽
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import { useState, ChangeEvent } from "react";
import Sidebar from "@/components/Sidebar";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  module: Yup.string().required("Required"),
  isActive: Yup.boolean(),
  expiresAt: Yup.date().required("Required"),
  questions: Yup.array()
    .of(
      Yup.object({
        questionText: Yup.string().required("Required"),
        options: Yup.array()
          .of(Yup.string().required("Required"))
          .min(2, "At least two options required"),
        correctAnswer: Yup.number()
          .min(0, "Invalid option")
          .required("Required"),
      }),
    )
    .min(1, "At least one question required"),
});

const MAX_QUESTIONS = 5;
interface QuestionData {
  questionText: string;
  options: string[];
  correctAnswer: number; // 0-based index of the correct option
}
const defaultQuestionData: QuestionData = {
  questionText: "",
  options: ["", "", "", ""],
  correctAnswer: 0,
};

export default function Quiz() {
  const [numOfQuestions, setNumOfQuestions] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const handleQuestionDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    optionIndex?: number,
  ) => {
    const updatedQuestions = [...questions];
    if (optionIndex !== undefined) {
      updatedQuestions[index].options[optionIndex] = e.target.value;
    } else if (e.target.name === "questionText") {
      updatedQuestions[index].questionText = e.target.value;
    } else {
      updatedQuestions[index].correctAnswer = Number(e.target.value);
    }
    setQuestions(updatedQuestions);
  };

  const handleNumOfQuestionsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    if (count <= MAX_QUESTIONS) {
      setNumOfQuestions(count);
      const newQuestions = Array(count).fill(defaultQuestionData);
      setQuestions(newQuestions);
    }
  };

  const handleSubmit = () => {
    console.log(questions); // Replace this with your submit logic
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 transition-all duration-300">
      {/* <Sidebar /> */}
      <div>
        <h2 className=" mb-5 p-6 text-xl font-bold">Create a New Quiz</h2>
        <div className="flex w-full flex-col p-6">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Enter number of questions:
            </label>
            <input
              style={{
                width: 100,
              }}
              type="number"
              min="1"
              max="5"
              value={numOfQuestions}
              onChange={handleNumOfQuestionsChange}
              className="w-full rounded-lg border px-3 py-2 shadow-sm"
            />
          </div>
          <div className="flex flex-col items-center justify-center border border-yellow-400">
            {questions.map((q, index) => (
              <div
                key={index}
                className="card m-4 min-w-[500px] border border-red-600"
              >
                <div className="card-body rounded bg-white">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    {`Question ${index + 1}:`}
                  </label>
                  <input
                    type="text"
                    name="questionText"
                    // value={q.questionText}
                    // onChange={(e) => handleQuestionDataChange(e, index)}
                    placeholder="Enter question text"
                    className="mb-2 w-full rounded-lg border px-3 py-2 shadow-sm"
                  />

                  {["A", "B", "C", "D"].map((optionLetter, optionIndex) => (
                    <div key={optionIndex} className="mb-2">
                      <label className="mb-1 block text-sm font-bold text-gray-700">
                        {`Option ${optionLetter}:`}
                      </label>
                      <input
                        type="text"
                        // value={q.options[optionIndex]}
                        // onChange={(e) =>
                        //   handleQuestionDataChange(e, index, optionIndex)
                        // }
                        placeholder={`Option ${optionLetter}`}
                        className="w-full rounded-lg border px-3 py-2 shadow-sm"
                      />
                    </div>
                  ))}

                  <div className="mb-2">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Correct Answer:
                    </label>
                    <select
                      name="correctAnswer"
                      //   value={q.correctAnswer}
                      //   onChange={(e) => handleQuestionDataChange(e, index)}
                      className="w-full rounded-lg border px-3 py-2 shadow-sm"
                    >
                      <option value="0">Option A</option>
                      <option value="1">Option B</option>
                      <option value="2">Option C</option>
                      <option value="3">Option D</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="btn btn-primary self-end">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
