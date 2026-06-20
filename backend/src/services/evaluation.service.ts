import { ExamModel }
from "../models/exam.model";

import { QuestionModel }
from "../models/question.model";

import { ExamAttemptModel }
from "../models/exam-attempt.model";

import {
  updateUserAnalytics,
} from "./analytics.service";

export const evaluateExam =
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
      const answer of answers
    ) {

      const question =
        await QuestionModel.findById(
          answer.questionId
        );

      if (!question) {
        continue;
      }

      const isCorrect =
        question.answer ===
        answer.selectedAnswer;

      if (isCorrect) {
        score++;
      }

      evaluatedAnswers.push({
        questionId:
          question._id,

        selectedAnswer:
          answer.selectedAnswer,

        isCorrect,
      });
    }

    const percentage =
      exam.totalQuestions > 0
        ? (
            score /
            exam.totalQuestions
          ) * 100
        : 0;

    const attempt =
      await ExamAttemptModel.create({
        userId,
        examId,
        answers:
          evaluatedAnswers,
        score,
        percentage,
        submittedAt:
          new Date(),
      });

  await updateUserAnalytics(
      userId,
    );

    return {
      attempt,
      score,
      percentage,
      totalQuestions:
        exam.totalQuestions,
      correctAnswers:
        score,
    };
  };