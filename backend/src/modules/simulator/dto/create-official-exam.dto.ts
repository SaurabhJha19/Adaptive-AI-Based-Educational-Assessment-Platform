import { ExamType } from "../constants/exam-type.enum";

export interface CreateOfficialExamDto {
  title: string;
  examType: ExamType;
  pdfUrl: string;
  year?: number;
  publisher?: string;
}