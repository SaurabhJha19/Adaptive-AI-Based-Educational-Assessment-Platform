import { Response }
from "express";

import {
  explainQuestion,
} from "../services/explainer.service";

import {
  AuthRequest,
} from "../middleware/auth.middleware";

export const askExplainer =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const {
      question,
    } = req.body;

    const response =
      await explainQuestion({
        userId:
          req.user!.userId,

        question,
      });

    res.status(200).json({
      success: true,
      ...response,
    });
  };