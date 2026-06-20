import { Router } from "express";

import {
  createFeedback,
} from "../controllers/feedback.controller";

import {
  authenticate,
} from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  createFeedback
);

export default router;