import { Request, Response } from "express";

import { asyncHandler } from "../utils/async-handler";
import { AuthRequest } from "../middleware/auth.middleware";

import { getDashboardData } from "../services/dashboard.service";

export const getDashboard =
    asyncHandler(

        async (

            req: AuthRequest,

            res: Response

        ) => {

            const dashboard =

                await getDashboardData(

                    req.user!.userId

                );

            res.status(200).json(

                dashboard

            );

        }

    );