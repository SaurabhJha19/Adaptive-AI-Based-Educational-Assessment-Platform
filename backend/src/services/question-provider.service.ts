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
    difficulty:
      | "easy"
      | "medium"
      | "hard",
    count: number
  ): Promise<GeneratedQuestion[]>;
}