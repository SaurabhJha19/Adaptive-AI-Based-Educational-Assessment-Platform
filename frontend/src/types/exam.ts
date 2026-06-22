export interface Exam {
  _id: string;

  title: string;

  documentId: string;

  totalQuestions: number;

  status: string;

  createdAt: string;
}

export interface Question {
  _id: string;

  question: string;

  options: string[];

  answer: string;

  difficulty: string;

  topic: string;

  explanation?: string;
}