import { Request, Response } from "express";

import { asyncHandler } from "../utils/async-handler";

import {

    getAttemptSummary,

    getQuestionReview,

    getSectionBreakdown,

} from "../services/evaluation.service";

export const attemptSummary =

    asyncHandler(

        async (

            req: Request,

            res: Response

        ) => {

            const data =

                await getAttemptSummary(

                    req.params.id as string

                );

            res.json(data);

        }

    );

export const questionReview =

    asyncHandler(

        async (

            req: Request,

            res: Response

        ) => {

            const data =

                await getQuestionReview(

                    req.params.id as string

                );

            res.json(data);

        }

    );

export const sectionBreakdown =

    asyncHandler(

        async (

            req: Request,

            res: Response

        ) => {

            const data =

                await getSectionBreakdown(

                    req.params.id as string

                );

            res.json(data);

        }

    );