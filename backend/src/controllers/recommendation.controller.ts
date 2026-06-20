import { Response }
from "express";

import {
  RecommendationModel,
} from "../models/recommendation.model";

import {
  AuthRequest,
} from "../middleware/auth.middleware";

export const getRecommendations =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const recommendations =
      await RecommendationModel.find({
        userId:
          req.user!.userId,
      });

    res.status(200).json({
      success: true,
      recommendations,
    });
  };