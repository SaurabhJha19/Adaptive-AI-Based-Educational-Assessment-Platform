import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import { evaluateExam } from "../services/evaluation.service";

import { ExamAttemptModel } from "../models/exam-attempt.model";

import { QuestionModel } from "../models/question.model";

export const submitExam = async (
  req: AuthRequest,
  res: Response
) => {

const {
  examId,
  sourceType,
  sourceId,
  attemptId,
  answers,
} = req.body;

const result = await evaluateExam({
  userId: req.user!.userId,
  examId,
  sourceType,
  sourceId,
  attemptId,
  answers,
});

  res.status(200).json({
    success: true,
    ...result,
  });

};

export const getExamResult = async (
  req: AuthRequest,
  res: Response
) => {

  const { examId } = req.params;

  const attempt =
    await ExamAttemptModel
      .findOne({
        examId,
        userId: req.user!.userId,
      })
      .sort({
        createdAt: -1,
      });

  if (!attempt) {
    return res.status(404).json({
      success: false,
      message: "Result not found",
    });
  }

  const answers =
    await Promise.all(

      attempt.answers.map(
        async (answer) => {

          const question =
            await QuestionModel.findById(
              answer.questionId
            );

          return {

            question: {

              _id: question?._id,

              question:
                question?.question,

              options:
                question?.options,

              correctAnswer:
                question?.answer,

              explanation:
                question?.explanation,

            },

            selectedAnswer:
              answer.selectedAnswer,

            isCorrect:
              answer.isCorrect,

          };
        }
      )
    );

  res.status(200).json({

    success: true,

    result: {

      _id: attempt._id,

      score: attempt.score,

      percentage:
        attempt.percentage,

      submittedAt:
        attempt.submittedAt,

      answers,

    },

  });
};

export const getMyAttempts = async (
  req: AuthRequest,
  res: Response
) => {
  const attempts =
    await ExamAttemptModel
      .find({
        userId: req.user!.userId,
      })
      .sort({
        createdAt: -1,
      });

  res.json({
    success: true,
    attempts,
  });
};


export const saveAttempt = async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;

  const {
    answers,
    currentQuestion,
    remainingTime,
  } = req.body;

  const attempt =
    await ExamAttemptModel.findOneAndUpdate(
      {
        _id: id,
        userId: req.user!.userId,
      },
      {
        answers,
        currentQuestion,
        remainingTime,
        lastSavedAt: new Date(),
      },
      {
        new: true,
      }
    );

  res.json({
    success: true,
    attempt,
  });
};