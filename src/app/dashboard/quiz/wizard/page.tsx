"use client";

import DisplayQuiz from "@/components/DisplayQuiz";
import { sendFileToServer } from "@/utils/apis/uploadDocument";
import { GeneratedQuestion } from "@/utils/interfaces";
import { useState, ChangeEvent, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";

export default function Quiz() {
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [properQuestions, setProperQuestions] = useState<GeneratedQuestion[]>();
  const [stage, setStage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [generatingQuiz, setGeneratingQuiz] = useState<boolean>(false);
  const [context, setContext] = useState<string>("");
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(3);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file.name);
      setFile(file);
    }
  };

  const generateQuiz = () => {
    if (file) {
      startAnalysis(file);
    }
  };

  // Placeholder function to simulate the AI analysis
  const startAnalysis = async (file: File) => {
    setGeneratingQuiz(true);
    try {
      // Step 1: Uploading
      setStage("Uploading ⬆️...");
      setAnalysisProgress(10);
      // Assume uploadFile returns a promise that resolves when the file is uploaded
      // await uploadFile(file); //goes to supabase storage and returns a url

      // Step 2: Analyzing
      setStage("Analyzing 💭...");
      setAnalysisProgress(30);
      // Assume some async analysis function
      // await analyzeFile(file); //goes to supabase pgvector and returns a vector
      setAnalysisProgress(50);

      // Step 3: Generating Quiz
      setStage("Generating questions 💡...");

      setAnalysisProgress(90);
      const res_ = await await sendFileToServer(
        "https://aevwyaazfzhahdlhanub.supabase.co/storage/v1/object/public/course-material/chapter%205.pdf",
        context,
        numberOfQuestions,
      );
      console.log("RESSSS", res_);
      if (res_) {
        setProperQuestions(res_);
        // setProperQuestions(JSON.stringify(res_));
      }

      // Step 4: Finalizing
      setStage("Quiz generated!🚀");
      setAnalysisProgress(100);
    } catch (error: any) {
      console.log(error);
    } finally {
      setGeneratingQuiz(false);
    }
  };

  const tryAgain = () => {
    if (
      window.confirm(
        "Are you sure you want to try again? your progress will be lost",
      )
    ) {
      setProperQuestions(undefined);
      setFile(null);
      setContext("");
      setNumberOfQuestions(3);
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
          {/* <button
            disabled={!file || pushingFile}
            className="btn btn-info btn-outline"
            onClick={handleSendFile}
          >
            {pushingFile ? <span className="loading loading-dots"></span> : ""}
            Regenerate &#10227;
          </button> */}
          <input
            ref={fileInputRef}
            disabled={!!file}
            onChange={handleFileUpload}
            type="file"
            accept=".pdf"
            className="file-input file-input-primary w-full max-w-xs"
          />
          {!!file && (
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to remove that file? your progress will be lost",
                  )
                ) {
                  setFile(null);
                }
              }}
              className="btn btn-error btn-outline text-2xl"
            >
              <AiFillDelete />
            </button>
          )}
        </div>
        {file && !properQuestions && (
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
                onChange={(e) => setContext(e.target.value)}
                className="textarea textarea-bordered h-24"
                placeholder="Some very important learning outcomes..."
              ></textarea>
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
            <button
              className="btn btn-primary self-end"
              disabled={!file || generatingQuiz || !(context.length > 10)}
              onClick={generateQuiz}
            >
              {generatingQuiz ? (
                <>
                  <span className="loading loading-dots"></span> Generating
                </>
              ) : (
                "Generate Quiz"
              )}
            </button>
          </div>
        )}
        {!!file && (generatingQuiz || !!properQuestions) && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-600">{stage}</span>
              <span className="text-sm text-primary">{analysisProgress}%</span>
            </div>
            <div className="h-2 rounded bg-gray-200">
              <div
                className="h-full rounded bg-primary"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
            {!!properQuestions && (
              <div className="flex flex-col gap-5">
                <div className="mt-4 flex flex-col rounded-lg border p-4">
                  {/* <p className="text-sm text-gray-600">{properQuestions}</p> */}
                  <DisplayQuiz questions={properQuestions} />
                </div>
                <div className="flex gap-2 self-end">
                  <button
                    className="btn btn-info btn-outline"
                    onClick={generateQuiz}
                  >
                    Regenerate &#10227;
                  </button>
                  <button
                    className="btn btn-error btn-outline"
                    onClick={tryAgain}
                  >
                    Try Again &#10227;
                  </button>
                  <button className="btn btn-primary">
                    Publish Quiz &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
