import { Request, Response }
from "express";

import {
  submitFeedback,
} from "../services/feedback.service";

import { AuthRequest }
from "../middleware/auth.middleware";

export const createFeedback =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const {
      questionId,
      rating,
      comment,
    } = req.body;

    const result =
      await submitFeedback({
        userId:
          req.user!.userId,

        questionId,
        rating,
        comment,
      });

    res.status(201).json({
      success: true,
      feedback:
        result,
    });
  };