import { Router }
from "express";

import {
  authenticate
}
from "../middleware/auth.middleware";

import {
  createExamController,
  getExamById,
  getUserExams,
}
from "../controllers/exam.controller";

import {
  submitExamController,
  getAttempts,
  getAttemptById,
}
from "../controllers/exam-attempt.controller";

const router = Router();

router.post(
  "/create",
  authenticate,
  createExamController
);

router.get(
  "/",
  authenticate,
  getUserExams
);

router.get(
  "/:id",
  authenticate,
  getExamById
);

router.post(
  "/submit",
  authenticate,
  submitExamController
);

router.get(
  "/attempts",
  authenticate,
  getAttempts
);

router.get(
  "/attempt/:id",
  authenticate,
  getAttemptById
);

export default router;