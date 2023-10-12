import { apiClient } from ".";
import axios from "axios";
import { GeneratedQuestion } from "../interfaces";

export async function sendFileToServer(
  filePath: string,
  topic: string,
  numberOfQuestions: number,
): Promise<GeneratedQuestion[]> {
  try {
    const response = await apiClient.post("/generateQuiz", {
      filePath,
      topic,
      numberOfQuestions,
    });
    console.log(response.data.result);
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
