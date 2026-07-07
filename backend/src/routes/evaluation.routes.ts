import { Router } from "express";

import {

    authenticate,

} from "../middleware/auth.middleware";

import {

    getAttemptSummary,

    getQuestionReview,

    getSectionBreakdown,

} from "../services/evaluation.service";

const router = Router();

router.get(

    "/attempt/:id",

    authenticate,

    getAttemptSummary

);

router.get(

    "/attempt/:id/review",

    authenticate,

    getQuestionReview

);

router.get(

    "/attempt/:id/sections",

    authenticate,

    getSectionBreakdown

);

export default router;