import { ExamModel }
from "../models/exam.model";

import {
  generateQuestions,
} from "./question-generator.service";

export const createExam =
  async ({
    userId,
    documentId,
    title,
    questionCount = 10,
    difficulty,
  }: {
    userId: string;
    documentId: string;
    title: string;
    questionCount?: number;
    difficulty?:
      | "adaptive"
      | "easy"
      | "medium"
      | "hard";
  }) => {

    /*
      Step 1
      Create an empty exam
    */

    const exam =
      await ExamModel.create({

        userId,

        documentId,

        title,

        questions: [],

        totalQuestions: 0,

        status: "draft",

      });

    /*
      Step 2
      Generate questions for THIS exam
    */

    const questions =
      await generateQuestions({

        userId,

        documentId,

        examId:
          exam._id.toString(),

        count:
          questionCount,

        difficultyOverride:
          difficulty === "adaptive"
            ? undefined
            : difficulty,

      });

    /*
      Step 3
      Attach questions
    */

    exam.questions =
      questions.map(
        q => q._id
      );

    exam.totalQuestions =
      questions.length;

    await exam.save();

    return exam;

  };