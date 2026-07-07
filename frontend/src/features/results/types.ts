export interface AttemptSummary {

    _id: string;

    score: number;

    percentage: number;

    totalQuestions: number;

    status: string;

    createdAt: string;

    examId?: string;

    sourceId?: string;

    sourceType: "generated" | "simulator";

}

export interface ResultSummary {

    id: string;

    score: number;

    percentage: number;

    totalQuestions: number;

    correct: number;

    incorrect: number;

    skipped: number;

    submittedAt: string;

    status: string;

}

export interface SectionResult {

    section: string;

    total: number;

    correct: number;

    incorrect: number;

    percentage: number;

}

export interface QuestionReview {

    questionId: string;

    question: string;

    options: string[];

    selectedAnswer: string;

    correctAnswer: string;

    explanation: string;

    difficulty: string;

    isCorrect: boolean;

}