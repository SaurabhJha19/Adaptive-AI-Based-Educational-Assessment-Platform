import { QuestionType } from "../constants/question-type.enum";

export interface ParsedQuestion {
  questionNumber: number;
  type: QuestionType;
  prompt: string;
  options: string[];
  correctAnswer: unknown;
  explanation?: string;
}