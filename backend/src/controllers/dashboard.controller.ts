import { Response } from "express";

import asyncHandler from "express-async-handler";

import { AuthRequest } from "../middleware/auth.middleware";

import { getDashboardData } from "../services/dashboard.service";

export const getDashboard = asyncHandler(
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const dashboard =
      await getDashboardData(
        req.user!.userId
      );

    res.json({

      success: true,

      dashboard,

    });

  }
);