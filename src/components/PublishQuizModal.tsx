import { useState, useEffect } from "react";
import { GeneratedQuestion, IQuiz, QRCodeOrigin } from "@/utils/interfaces";
import QRCodeModal from "./QRCodeModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { createQuiz } from "@/utils/apis/quiz";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  generatedQuestions: GeneratedQuestion[];
}

type IFormInputs = {
  title: string;
  isActive: boolean;
  expiresAt: Date;
  questions: GeneratedQuestion[];
};

export default function PublishQuizModal({
  isOpen,
  generatedQuestions,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<IFormInputs>({
    defaultValues: {
      questions: generatedQuestions,
    },
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const publishQuizMutation = useMutation({
    mutationFn: (data: IQuiz) => createQuiz(data),
    onMutate: (data) => {
      console.log("mutating:::", data);
    },
    onSuccess: (data) => {
      console.log("onSuccess:", data);
      toast.success("Quiz published successfully", {
        action: {
          label: "View",
          onClick: () => {
            router.push("/dashboard/quiz");
          },
        },
      });
      onClose();
    },
    onError: (error) => {
      toast.error("Something went wrong, please try again later");
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    console.log("data:::", data);
    let dataToSend: IQuiz = {
      expiresAt: data.expiresAt,
      isActive: data.isActive,
      module: "651835453acb0d7dd3434fe0",
      questions: data.questions,
      title: data.title,
    };
    publishQuizMutation.mutate(dataToSend, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getQuizzes"] });
      },
    });
  };

  return (
    <div>
      <dialog open={isOpen} className="modal">
        <div className="overflow modal-box border-2 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <h3 className="text-lg font-bold">Publish Quiz</h3>
            <p className="py-4">Please enter details about the quiz</p>

            <div className="w-full space-y-2 self-center rounded-md bg-gray-50 p-5">
              <div className="flex w-full max-w-xs items-center justify-between">
                <label className="label">Module Name</label>
                <div className="badge badge-ghost rounded-lg p-4">
                  Information Systems 3A
                </div>
              </div>
              <div className="flex w-full max-w-xs items-center justify-between">
                <label className="label">Number Of Questions</label>
                <div className="badge badge-ghost rounded-lg p-4">
                  {generatedQuestions.length}
                </div>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Give your quiz a title</span>
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="Quiz Title"
                  className={`input  w-full max-w-xs`}
                />
                <label className="label">
                  {errors.title && (
                    <span className="label-text text-error">
                      ❗Please provide a title for your quiz
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control  w-full max-w-xs">
                <label className="label cursor-pointer">
                  <span className="label-text">Activate the quiz</span>
                  <input
                    checked={watch("isActive")}
                    type="checkbox"
                    className="toggle toggle-primary"
                    {...register("isActive", {
                      value: true,
                    })}
                    onChange={(e) => {
                      setValue("isActive", e.target.checked);
                    }}
                  />
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Quiz expires at</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="Expires at"
                  className="input input-bordered w-full max-w-xs"
                  {...register("expiresAt", { required: true })}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2 self-end">
              <button type="button" className="btn" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting && <span className="loading loading-dots"></span>}
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
