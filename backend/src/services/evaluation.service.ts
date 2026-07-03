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

export const evaluateExam = async ({
  userId,
  examId,
  sourceType = "generated",
  sourceId,
  attemptId,
  answers,
}: {
  userId: string;
  examId: string;
  sourceType?: "generated" | "simulator";
  sourceId?: string;
  attemptId?: string;
  answers: {
    questionId: string;
    selectedAnswer: string;
  }[];
}) => {
  const exam =
    sourceType === "generated"
      ? await ExamModel.findById(examId)
      : await OfficialExam.findById(sourceId);

  if (!exam) {
    throw new Error("Exam not found");
  }

  let score = 0;

  const evaluatedAnswers = [];

  for (const answer of answers) {
    const question =
      await QuestionModel.findById(
        answer.questionId
      );

    if (!question) continue;

    const isCorrect =
      question.answer ===
      answer.selectedAnswer;

    if (isCorrect) {
      score++;
    }

    evaluatedAnswers.push({
      questionId: question._id,
      question: question.question,
      options: question.options,
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

  const totalQuestions =
    exam.totalQuestions ??
    exam.questions.length;

  const percentage =
    totalQuestions === 0
      ? 0
      : (score / totalQuestions) * 100;

  let attempt;

  if (attemptId) {
    attempt =
      await ExamAttemptModel.findByIdAndUpdate(
        attemptId,
        {
          answers: evaluatedAnswers,
          score,
          percentage,
          totalQuestions,
          submittedAt: new Date(),
          status: "COMPLETED",
        },
        {
          new: true,
        }
      );
  } else {
    attempt =
      await ExamAttemptModel.create({
        userId,

        examId:
          sourceType === "generated"
            ? examId
            : undefined,

        sourceType,

        sourceId:
          sourceType === "simulator"
            ? sourceId
            : examId,

        answers: evaluatedAnswers,

        score,

        percentage,

        totalQuestions,

        submittedAt: new Date(),

        status: "COMPLETED",
      });
  }

  await updateUserAnalytics(userId);

  return {
    attempt,
    score,
    percentage,
    totalQuestions,
    correctAnswers: score,
    incorrectAnswers:
      totalQuestions - score,
    review: evaluatedAnswers,
  };
};