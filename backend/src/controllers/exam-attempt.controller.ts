import { Response }
from "express";

import {
  AuthRequest
}
from "../middleware/auth.middleware";

import {
  asyncHandler
}
from "../utils/async-handler";

import {
  submitExam
}
from "../services/exam-attempt.service";

import {
  ExamAttemptModel
}
from "../models/exam-attempt.model";

export const submitExamController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const attempt =
        await submitExam({
          userId:
            req.user!.userId,

          examId:
            req.body.examId,

          answers:
            req.body.answers,
        });

      res.status(201).json({
        success: true,
        attempt,
      });
    }
  );

export const getAttempts =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const attempts =
        await ExamAttemptModel.find({
          userId:
            req.user!.userId,
        });

      res.status(200).json({
        success: true,
        count:
          attempts.length,
        attempts,
      });
    }
  );

export const getAttemptById =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const attempt =
        await ExamAttemptModel
          .findById(
            req.params.id
          );

      res.status(200).json({
        success: true,
        attempt,
      });
    }
  );