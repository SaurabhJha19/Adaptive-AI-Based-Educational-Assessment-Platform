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
  UserAnalyticsModel
}
from "../models/user-analytics.model";

export const getAnalytics =
  asyncHandler(
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
    }
  );