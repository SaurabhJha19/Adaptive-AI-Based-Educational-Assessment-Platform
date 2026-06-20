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
  submitExam,
  getExamResult,
}
from "../controllers/exam-attempt.controller";

import {
  generateKnowledgeBaseExamController,
} from "../controllers/exam.controller";

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
  submitExam  
);

router.get(
  "/attempts",
  authenticate,
  getExamResult
);

router.post(
  "/knowledge-base",
  authenticate,
  generateKnowledgeBaseExamController
);

export default router;