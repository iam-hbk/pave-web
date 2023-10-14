import { apiClient } from ".";
import axios from "axios";
import { GeneratedQuestion, IQuiz } from "../interfaces";

export interface GenerateQuizQuestionProps {
  filePath: string;
  topic: string;
  numberOfQuestions: number;
}

export async function generateQuizQuestion({
  filePath,
  numberOfQuestions,
  topic,
}: GenerateQuizQuestionProps): Promise<GeneratedQuestion[]> {
  try {
    const response = await apiClient.post("/generateQuiz", {
      filePath,
      topic,
      numberOfQuestions,
    });
    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors here

      console.error("Axios error:", error.response?.data);
    } else {
      // Handle other types of errors
      console.error("Error:", error);
    }
    throw error;
  }
}

export async function createQuiz(quiz: IQuiz): Promise<IQuiz> {
  try {
    const response = await apiClient.post("/quiz", quiz);
    console.log("Quiz Created:", response.data);
    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors here

      console.error("Axios error:", error.response?.data);
    } else {
      // Handle other types of errors
      console.error("Error:", error);
    }
    throw error;
  }
}

export type IGetQuizProps = IQuiz & {
  _id: string;
  numberOfStudentsThatAttemptedQuiz: number;
  expiresAt: string;
  createdAt: string;
};
export async function getQuizByModuleId(
  moduleId: string,
): Promise<IGetQuizProps[]> {
  try {
    const response = await apiClient.get(`/quiz/module/id/${moduleId}`);
    console.log("Quiz Retrieved:", response.data.quizzes);
    return response.data.quizzes;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors here

      console.error("Axios error:", error.response?.data);
    } else {
      // Handle other types of errors
      console.error("Error:", error);
    }
    throw error;
  }
}
