import { GeneratedQuestion } from "@/utils/interfaces";
import React, { FC } from "react";

interface DisplayQuizProps {
  questions: GeneratedQuestion[];
}

const DisplayQuiz: FC<DisplayQuizProps> = ({ questions }) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
      {questions.map((question, questionIndex) => (
        <div
          key={questionIndex}
          className="rounded-lg bg-slate-400 p-4 shadow-md hover:shadow-xl transition-all duration-300"
        >
          <h2 className="mb-2 text-xl font-bold text-white">
            {questionIndex + 1}.{question.questionText}
          </h2>
          <ul className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                className="badge flex h-fit w-full items-center justify-start space-x-2 rounded-md bg-slate-100 py-2"
              >
                <span className=" text-base">{option}</span>
                {optionIndex === question.correctAnswer && <span>✅</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DisplayQuiz;
