"use client";

import { useState, ChangeEvent, useRef } from "react";

export default function Quiz() {
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);
  const [stage, setStage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [generatingQuiz, setGeneratingQuiz] = useState<boolean>(false);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file.name);
      setFile(file);
      setFileUploaded(true);
    }
  };

  const generateQuiz = () => {
    if (fileUploaded && file) {
      startAnalysis(file);
    }
  };

  // Placeholder function to simulate the AI analysis
  const startAnalysis = (file: File) => {
    setGeneratingQuiz(true);
    // Simulate progress
    let progress = 0;

    const progressStages: { [key: number]: string } = {
      1: "Uploading ⬆️...",
      20: "Analyzing 💭...",
      30: "Generating questions 💡...",
      40: "Generating answers ⚙️...",
      50: "Putting it all together🧩...",
      65: "Touching up🧹...",
      90: "Almost there ✍🏽...",
      100: "Quiz generated!🚀",
    };

    const interval = setInterval(() => {
      progress += 1;

      if (progressStages[progress]) {
        setStage(progressStages[progress]);
      }

      setAnalysisProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
        // Simulate document preview after analysis
        setDocumentPreview(
          "This is a preview of the generated questions using the uploaded document...\nThe Question component is yet to be made.",
        );
        setGeneratingQuiz(false);
      }
    }, 200);

    // TODO: Add your HTTP request logic here
  };

  const tryAgain = () => {
    //reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileUploaded(false);
    setAnalysisProgress(0);
    setDocumentPreview(null);
    setStage("");
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 p-2 pt-4 transition-all duration-300">
      <div className="min-w-xl  flex w-full flex-col rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl text-primary">
          Create a Quiz using the <b>Form Wizard</b>
        </h2>
        <p className="mb-6 text-gray-600">
          Upload your course material, and let{" "}
          <b className="text-primary">Pave</b> AI&apos;s advanced algorithms
          analyze the content. Based on the material&apos;s key points and
          concepts, <b className="text-primary">Pave</b> AI will automatically
          generate a comprehensive quiz tailored for your students, ensuring
          they grasp the essential topics effectively.
        </p>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Upload PDF:
          </label>
          <input
            ref={fileInputRef}
            disabled={fileUploaded}
            onChange={handleFileUpload}
            type="file"
            accept=".pdf"
            className="w-full rounded-lg border px-3 py-2 shadow-sm"
          />
        </div>
        {file && !documentPreview && (
          <button
            className="btn btn-primary self-end"
            disabled={!fileUploaded}
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
        )}
        {fileUploaded && (generatingQuiz || documentPreview) && (
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
            {documentPreview && (
              <div className="flex flex-col gap-5">
                <div className="mt-4 flex flex-col rounded-lg border p-4">
                  <p className="text-sm text-gray-600">{documentPreview}</p>
                </div>
                <div className="flex gap-2 self-end">
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
