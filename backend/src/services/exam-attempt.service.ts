import { ExamModel }
from "../models/exam.model";

import { QuestionModel }
from "../models/question.model";

import { ExamAttemptModel }
from "../models/exam-attempt.model";

import {
  updateUserAnalytics
}
from "./analytics.service";

export const submitExam =
  async ({
    userId,
    examId,
    answers,
  }: {
    userId: string;
    examId: string;
    answers: {
      questionId: string;
      selectedAnswer: string;
    }[];
  }) => {

    const exam =
      await ExamModel.findById(
        examId
      );

    if (!exam) {
      throw new Error(
        "Exam not found"
      );
    }

    let score = 0;

    const evaluatedAnswers =
      [];

    for (
      const answer
      of answers
    ) {

      const question =
        await QuestionModel.findById(
          answer.questionId
        );

      const correct =
        question?.answer ===
        answer.selectedAnswer;

      if (correct) {
        score++;
      }

      evaluatedAnswers.push({
        questionId:
          answer.questionId,
        selectedAnswer:
          answer.selectedAnswer,
        correct,
      });
    }

    const percentage =
      (score /
        exam.totalQuestions) *
      100;

    const attempt =
      await ExamAttemptModel.create({
        userId,
        examId,
        sourceType: "generated",
        sourceId: examId,

        answers:
          evaluatedAnswers,

        score,

        totalQuestions:
          exam.totalQuestions,

        percentage,

        status:
          "completed",
      });

      await updateUserAnalytics(
        userId
      );

    return attempt;
  };