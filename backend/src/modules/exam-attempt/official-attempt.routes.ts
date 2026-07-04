import { Router } from "express";

import { authenticate }
from "../../middleware/auth.middleware";

import {
  startAttempt,
  submitAttempt,
  saveAttempt,
  getAttempt,
  getResult,
  getMyAttempts,
} from "./official-attempt.controller";

const router = Router();

/**
 * Start a simulator attempt
 */
router.post(
  "/:examId/start",
  authenticate,
  startAttempt
);

/**
 * Save progress
 */
router.patch(
  "/:attemptId/save",
  authenticate,
  saveAttempt
);

/**
 * Submit attempt
 */
router.post(
  "/:attemptId/submit",
  authenticate,
  submitAttempt
);

/**
 * Attempt details
 */
router.get(
  "/:attemptId",
  authenticate,
  getAttempt
);

/**
 * Result
 */
router.get(
  "/:attemptId/result",
  authenticate,
  getResult
);

/**
 * User history
 */
router.get(
  "/",
  authenticate,
  getMyAttempts
);

export default router;