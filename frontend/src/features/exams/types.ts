export type ExamDifficulty =
  | "adaptive"
  | "easy"
  | "medium"
  | "hard";

export interface Question {
  _id: string;

  question: string;

  options: string[];

  correctAnswer?: string;

  explanation?: string;

  difficulty?: string;
}

export interface Exam {
  _id: string;

  title: string;

  description: string;

  duration: number;

  totalQuestions: number;

  status: "draft" | "published";

  questions: Question[];

  createdAt: string;

  updatedAt: string;
}
export interface ExamReview {

  questionId: string;

  question: string;

  options: string[];

  selectedAnswer: string;

  correctAnswer: string;

  explanation: string;

  difficulty: string;

  isCorrect: boolean;

}

export interface ExamResult {

  score: number;

  percentage: number;

  totalQuestions: number;

  correctAnswers: number;

  incorrectAnswers: number;

  review: ExamReview[];

}

export interface GenerateExamDto {

  documentId: string;

  title: string;

  questionCount: number;

  difficulty: ExamDifficulty;

}

export interface ExamAnswer {
  questionId: string;
  selectedAnswer: string;
}