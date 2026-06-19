import { QuestionModel }
from "../models/question.model";

export const generateQuestions =
  async ({
    userId,
    documentId,
    chunks,
  }: {
    userId: string;
    documentId: string;
    chunks: string[];
  }) => {

    const questions = [];

    for (
      let i = 0;
      i < Math.min(chunks.length, 5);
      i++
    ) {

      const question =
        await QuestionModel.create({
          userId,
          documentId,

          question:
            `What is discussed in section ${
              i + 1
            }?`,

          options: [
            "Option A",
            "Option B",
            "Option C",
            "Option D",
          ],

          answer:
            "Option A",

          explanation:
            "Mock question generated before OpenAI integration.",

          difficulty:
            "medium",

          topic: "General",

          type:
            "mcq",
        });

      questions.push(
        question
      );
    }

    return questions;
  };