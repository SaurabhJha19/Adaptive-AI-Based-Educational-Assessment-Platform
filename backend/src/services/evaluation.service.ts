import { ExamModel }
from "../models/exam.model";

import { QuestionModel }
from "../models/question.model";

import { ExamAttemptModel }
from "../models/exam-attempt.model";

import {
  updateUserAnalytics,
} from "./analytics.service";

import OfficialExam from "../modules/simulator/models/official-exam.model";



export const getExamResult =
async (
    examId: string,
    userId: string,
) => {

    const attempt =
    await ExamAttemptModel
        .findOne({

            examId,

            userId,

        })
        .sort({
            createdAt: -1,
        });

    if (!attempt) {

        throw new Error(
            "Result not found"
        );

    }

    return attempt;

};

export const evaluateExam =
  async ({
    userId,
    examId,
    sourceType = "generated",
    sourceId,
    answers,
  }: {
    userId: string;
    examId: string;
    sourceType: string;
    sourceId: string;

    answers: {
      questionId: string;
      selectedAnswer: string;
    }[];
  }) => {

    let exam;

    if (sourceType === "generated") {
      exam = await ExamModel.findById(examId);
    } else {
      exam = await OfficialExam.findById(sourceId);
    }

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

        question:
          question.question,

        options:
          question.options,

        selectedAnswer:
          answer.selectedAnswer,

        correctAnswer:
          question.answer,

        explanation:
          question.explanation,

        difficulty:
          question.difficulty,

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
        sourceType: "generated",
        sourceId: sourceId ?? examId,
        answers:
          evaluatedAnswers,
        score,
        percentage,
        submittedAt:
          new Date(),
        totalQuestions: exam.questions.length,
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

        incorrectAnswers:
          exam.totalQuestions - score,

        review:
          evaluatedAnswers,

      };
  };