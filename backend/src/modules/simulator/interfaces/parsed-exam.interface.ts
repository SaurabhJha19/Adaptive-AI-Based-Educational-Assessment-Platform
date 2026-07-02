import { ExamType } from "../constants/exam-type.enum";
import { ParsedSection } from "./parsed-section.interface";

export interface ParsedExam {
  metadata: {
    title: string;
    examType: ExamType;
    duration: number;
    totalQuestions: number;
    publisher?: string;
    year?: number;
  };

  sections: ParsedSection[];
}