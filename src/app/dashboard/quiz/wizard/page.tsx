"use client";

import DisplayQuiz from "@/components/DisplayQuiz";
import PublishQuizModal from "@/components/PublishQuizModal";
import { uploadFileToSupabse, supabase } from "@/utils/apis/supabase";
import {
  generateQuizQuestion,
  GenerateQuizQuestionProps,
} from "@/utils/apis/quiz";
import { GeneratedQuestion } from "@/utils/interfaces";
import { useState, ChangeEvent, useRef } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

export default function Quiz() {
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState<string>("");
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(3);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file.name);
      setFile(file);
      setContext("");
    }
  };

  return (
    <div className="mx-4 flex min-h-screen justify-center bg-gray-100 p-2 pt-4 transition-all duration-300">
      <div className="min-w-xl  flex w-full flex-col rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl text-primary">
          Create a Quiz using the <b>Form Wizard</b>
        </h2>
        <p className="mb-6 text-gray-600">
          Upload your course material, and let{" "}
          <b className="text-primary">Pave AI</b> &apos;s advanced algorithms
          analyze the content. Based on the material&apos;s key points and
          concepts, <b className="text-primary">Pave AI</b> will automatically
          generate a comprehensive quiz tailored for your students, ensuring
          they grasp the essential topics effectively.
        </p>
        <div className="mb-4 flex gap-2">
          <input
            onChange={handleFileUpload}
            type="file"
            accept=".pdf"
            className="file-input file-input-primary w-full max-w-xs"
          />
        </div>

        {!!file && (
          <div className="flex w-full flex-col gap-3 transition-all duration-300 ">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  What do you want the quiz to focus on ?
                </span>
                <span
                  className="tooltip tooltip-left flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 font-bold text-white hover:bg-primary-focus"
                  data-tip="This will help PAVE AI generate questions that focus more on the topics you want your students to learn the most. Please make sure they are outlined in the document."
                >
                  <p>?</p>
                </span>
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="textarea textarea-bordered h-24"
                placeholder="Some very important learning outcomes"
              ></textarea>
              {context.length < 10 && (
                <label className="label">
                  <label className="label-text text-error">
                    You have provide a context for the quiz to focus on.
                    (minimum 10 characters)
                  </label>
                </label>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">
                  How many questions do you want the quiz to have (1-5)?
                </span>
              </label>
              <input
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                type="number"
                max={5}
                min={1}
                placeholder="Number of questions"
                className="input input-bordered w-full max-w-[15rem]"
              />
            </div>
          </div>
        )}
        {!!file && (
          <QuizGenerator
            fileRef={fileInputRef}
            file={file}
            topic={context}
            numberOfQuestions={numberOfQuestions}
          />
        )}
      </div>
    </div>
  );
}

type QuizGeneratorProps = {
  file: File;
  topic: string;
  numberOfQuestions: number;
  fileRef: React.MutableRefObject<HTMLInputElement | null>;
};

const QuizGenerator: React.FC<QuizGeneratorProps> = ({
  file,
  topic,
  numberOfQuestions,
  fileRef,
}) => {
  const [generatedQuestions, setGeneratedQuestions] = useState<
    GeneratedQuestion[] | null
  >();
  const [stage, setStage] = useState<string>("");
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [errorAnalysisProgress, setErrorAnalysisProgress] =
    useState<boolean>(false);

  const [fileUrl, setFileUrl] = useState<string>();
  const [publishQuiz, setPublishQuiz] = useState<boolean>(false);

  const mutationUploadFile = useMutation(uploadFileToSupabse, {
    onMutate: () => {
      setStage("Uploading File 📤");
      setAnalysisProgress(15);
    },
    onSuccess: (fileUrl) => {
      setFileUrl(fileUrl);
      setStage("Generating Questions ⚙️");
      setAnalysisProgress(65);
      mutationGenerateQuizQuestion.mutate({
        filePath: fileUrl,
        topic,
        numberOfQuestions,
      });
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
      setStage("Error uploading file 😥");
      setErrorAnalysisProgress(true);
    },
  });

  const mutationGenerateQuizQuestion = useMutation(generateQuizQuestion, {
    onSuccess: (questions) => {
      setGeneratedQuestions(questions);
      setStage("");

      toast.success("Questions Generated 🎉");
      setAnalysisProgress(100);
    },
    onError: (error) => {
      console.error("Error generating questions:", error);
      setStage("Error generating questions 😥");
      setErrorAnalysisProgress(true);
    },
  });
  const generateQuiz = async () => {
    setErrorAnalysisProgress(false);
    mutationUploadFile.mutate(file);
  };

  const handleRegenerate = () => {
    if (fileUrl && topic && numberOfQuestions) {
      setGeneratedQuestions(null);
      setStage("Generating Questions ⚙️");
      setAnalysisProgress(65);

      mutationGenerateQuizQuestion.mutate({
        filePath: fileUrl,
        topic,
        numberOfQuestions,
      });
    } else {
      console.log("No file url found");
    }
  };
  return (
    <div className="mt-4 flex w-full flex-col">
      {!errorAnalysisProgress && (
        <button
          className="btn btn-primary mb-4 self-end"
          disabled={
            !file ||
            !(topic.length > 10) ||
            (analysisProgress > 0 && analysisProgress < 100)
          }
          onClick={generateQuiz}
        >
          {analysisProgress > 0 && analysisProgress < 100 ? (
            <>
              <span className="loading loading-dots loading-xs"></span>
              <span>Generating</span>
            </>
          ) : (
            "Generate Quiz"
          )}
        </button>
      )}
      {errorAnalysisProgress && (
        <button
          className="btn btn-primary mb-4 self-end"
          onClick={generateQuiz}
        >
          Try Again
        </button>
      )}
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center text-base text-gray-600">
          <span>{stage}</span>
          {!errorAnalysisProgress &&
            analysisProgress > 0 &&
            analysisProgress < 100 && (
              <span className="loading loading-ring loading-xs"></span>
            )}
        </span>
        <span className="text-sm text-primary">{analysisProgress}%</span>
      </div>
      <div className="h-2 rounded bg-gray-200">
        <div
          className={`h-full rounded ${
            errorAnalysisProgress ? "bg-error" : "bg-primary"
          }`}
          style={{ width: `${analysisProgress}%` }}
        ></div>
      </div>

      {!!generatedQuestions &&
        !(analysisProgress > 0 && analysisProgress < 100) && (
          <div className="flex flex-col gap-5">
            <div className="mt-4 flex flex-col rounded-lg border p-4">
              <DisplayQuiz questions={generatedQuestions} />
            </div>
            <div className="flex gap-2 self-end">
              <button
                className="btn btn-error btn-outline"
                onClick={() => {
                  fileRef.current?.click();
                }}
              >
                Try again With a different file &#10227;
              </button>

              <button
                className="btn btn-info btn-outline"
                onClick={handleRegenerate}
              >
                Regenerate &#10227;
              </button>

              <button
                onClick={() => setPublishQuiz(true)}
                className="btn btn-primary"
              >
                Publish Quiz &rarr;
              </button>

              <PublishQuizModal
                generatedQuestions={generatedQuestions}
                isOpen={publishQuiz}
                onClose={() => setPublishQuiz(false)}
              />
            </div>
          </div>
        )}
    </div>
  );
};
