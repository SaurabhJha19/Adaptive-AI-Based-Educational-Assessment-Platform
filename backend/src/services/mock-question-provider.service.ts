import {
  GeneratedQuestion,
  QuestionProvider,
} from "./question-provider.service";

export class MockQuestionProvider
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

    let topic =
      "General";

    const lowerContext =
      context.toLowerCase();

    if (
      lowerContext.includes(
        "tourism"
      )
    ) {
      topic =
        "Tourism";
    }

    if (
      lowerContext.includes(
        "economics"
      )
    ) {
      topic =
        "Economics";
    }

    if (
      lowerContext.includes(
        "environment"
      )
    ) {
      topic =
        "Environment";
    }

    return Array.from(
      { length: count },
      (_, index) => ({
        question:
          `Mock Question ${
            index + 1
          }`,

        options: [
          "Option A",
          "Option B",
          "Option C",
          "Option D",
        ],

        answer:
          "Option A",

        difficulty,

        topic,
      })
    );
  }
}