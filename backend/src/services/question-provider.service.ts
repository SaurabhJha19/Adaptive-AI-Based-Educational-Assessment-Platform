export interface GeneratedQuestion {

  question: string;

  options: string[];

  answer: string;

  difficulty:
    | "easy"
    | "medium"
    | "hard";

  topic: string;

  explanation: string;

  sourceChunkIds: string[];
}

export interface QuestionProvider {

  generateQuestions(
    context: string,
    difficulty: string,
    count: number,
  ): Promise<{
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }[]>;
}