import { Response }
from "express";

import { AuthRequest }
from "../middleware/auth.middleware";

import {
  evaluateExam,
} from "../services/evaluation.service";

import {
  ExamAttemptModel,
} from "../models/exam-attempt.model";

export const submitExam =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const examId =
      req.params.examId as string;

    const {
      answers,
    } = req.body;

    const result =
      await evaluateExam({
        userId:
          req.user!.userId,

        examId,
        answers,
      });

    res.status(200).json({
      success: true,
      ...result,
    });
  };

export const getExamResult =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const examId =
      req.params.examId as string;

    const result =
      await ExamAttemptModel
        .findOne({
          examId,
          userId:
            req.user!.userId,
        })
        .sort({
          createdAt: -1,
        });

    if (!result) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Result not found",
        });
    }

    res.status(200).json({
      success: true,
      result,
    });
  };