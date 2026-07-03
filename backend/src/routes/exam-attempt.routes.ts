import { Router }
from "express";

import {
  authenticate,
} from "../middleware/auth.middleware";

import {
  submitExam,
  getExamResult,
} from "../controllers/exam-attempt.controller";

import {
  getMyAttempts,
} from "../controllers/exam-attempt.controller";

const router =
  Router();

router.post(
  "/:examId/submit",
  authenticate,
  submitExam
);

router.get(
  "/:examId/result",
  authenticate,
  getExamResult
);

router.get(

"/result/:examId",

authenticate,
getExamResult

);


router.get(
  "/",
  authenticate,
  getMyAttempts
);

export default router;