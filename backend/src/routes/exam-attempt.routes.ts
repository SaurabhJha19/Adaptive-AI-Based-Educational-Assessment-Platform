import { Router }
from "express";

import {
  authenticate,
} from "../middleware/auth.middleware";

import {
  submitExam,
  getExamResult,
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

export default router;