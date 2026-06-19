import { ExamModel }
from "../models/exam.model";

import { QuestionModel }
from "../models/question.model";

export const createExam =
  async (
    userId: string,
    documentId: string,
    title: string
  ) => {

    const questions =
      await QuestionModel.find({
        userId,
        documentId,
      });

    const exam =
      await ExamModel.create({
        userId,
        documentId,
        title,

        questions:
          questions.map(
            q => q._id
          ),

        totalQuestions:
          questions.length,

        status:
          "draft",
      });

    return exam;
  };