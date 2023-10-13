import { apiClient } from ".";
import axios from "axios";
import { GeneratedQuestion } from "../interfaces";

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
