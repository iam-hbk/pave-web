import { GeneratedQuestion } from "@/utils/interfaces/index";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PromptTemplate } from "langchain/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";
import { Document } from "langchain/document";

const SAMPLE_RESPONSE: GeneratedQuestion[] = [
  {
    questionText: "What is the capital of France?",
    options: ["Rome", "Madrid", "Paris", "Berlin"],
    correctAnswer: 2,
  },
  {
    questionText: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    questionText: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: 3,
  },
];

const model = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.7,
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

function validateOutput(output: any): output is GeneratedQuestion[] {
  return (
    Array.isArray(output) &&
    output.every(
      (item) =>
        typeof item.questionText === "string" &&
        Array.isArray(item.options) &&
        typeof item.correctAnswer === "number",
    )
  );
}

export async function generateQuizOpenai(
  numberOfquestions: number,
  topic: string,
): Promise<GeneratedQuestion[] | string> {
  const PROMPT = `
      Generate multiple-choice questions each question along with four answer options. 
      The topic is ${topic}. and the number of questions is ${numberOfquestions}.
      Specify the correct answer by providing its index (0-3) in the array of options.
      Format the output as a JSON object which is an array and each object with the following keys: 
      "questionText" for the question, "options" for an array of answer choices, and "correctAnswer" for the index of the correct answer. 
      Example:
      ${JSON.stringify(SAMPLE_RESPONSE)}
    `;

  try {
    const res = await model.invoke(PROMPT.replace(/\n/g, ""));
    const output = JSON.parse(res.content);

    if (validateOutput(output)) {
      return output;
    } else {
      throw new Error("Output format is incorrect");
    }
  } catch (error) {
    console.error("Error parsing or validating the output:", error);
    return "An error occurred while generating the quiz";
  }
}
