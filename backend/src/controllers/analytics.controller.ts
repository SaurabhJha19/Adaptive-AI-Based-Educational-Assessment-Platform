import { Response }
from "express";

import {
  UserAnalyticsModel,
} from "../models/user-analytics.model";

import {
  AuthRequest,
} from "../middleware/auth.middleware";

export const getAnalytics =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const analytics =
      await UserAnalyticsModel.findOne({
        userId:
          req.user!.userId,
      });

    res.status(200).json({
      success: true,
      analytics,
    });
  };