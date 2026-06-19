import { Router } from "express";

import { authenticate }
from "../middleware/auth.middleware";

import {
  createQuestions,
}
from "../controllers/question.controller";

const router = Router();

router.post(
  "/generate",
  authenticate,
  createQuestions
);

export default router;