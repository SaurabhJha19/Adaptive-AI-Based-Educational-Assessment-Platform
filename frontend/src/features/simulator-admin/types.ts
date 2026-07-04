export type OfficialExamStatus =
  | "draft"
  | "review"
  | "published"
  | "archived";

export interface OfficialExam {
  _id: string;
  examCode: string;
  title: string;
  examType: string;
  status: OfficialExamStatus;
  totalQuestions: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOfficialExamPayload {
  examCode: string;
  title: string;
  examType: string;
  file: File;
}