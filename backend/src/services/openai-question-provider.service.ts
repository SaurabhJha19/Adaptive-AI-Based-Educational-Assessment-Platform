import {
  GeneratedQuestion,
  QuestionProvider,
}
from "./question-provider.service";

export class OpenAIQuestionProvider
  implements QuestionProvider {

  async generateQuestions(
    context: string,
    difficulty:
      | "easy"
      | "medium"
      | "hard",
    count: number
  ): Promise<
    GeneratedQuestion[]
  > {

    throw new Error(
      "GPT_PENDING_KEY"
    );
  }
}