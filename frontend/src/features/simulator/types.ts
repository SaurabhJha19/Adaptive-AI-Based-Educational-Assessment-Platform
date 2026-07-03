export interface OfficialExam {
  _id: string;
  examCode: string;
  title: string;
  examType: string;
  duration: number;
  totalQuestions: number;
  year?: number;
  publisher?: string;
}

export interface ExamType {
  type: string;
  name: string;
}