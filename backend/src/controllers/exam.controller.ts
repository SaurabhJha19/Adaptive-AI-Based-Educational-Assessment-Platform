import { Response }
from "express";

import {
  AuthRequest
}
from "../middleware/auth.middleware";

import {
  asyncHandler
}
from "../utils/async-handler";

import {
  createExam
}
from "../services/exam.service";

import {
  ExamModel
}
from "../models/exam.model";

import {
  generateKnowledgeBaseExam,
} from "../services/knowledge-base-exam.service";

export const createExamController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const {
        documentId,
        title,
        questionCount,
        difficulty,
      } = req.body;

      const exam =
        await createExam({

          userId:
            req.user!.userId,

          documentId,

          title,

          questionCount,

          difficulty,

        });

      res.status(201).json({

        success: true,

        exam,

      });

    }
  );

export const getExamById =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

        const exam =
          await ExamModel
            .findOne({
              _id: req.params.id,
              userId: req.user!.userId,
            })
            .populate("questions");

        if (!exam) {
          return res.status(404).json({
            success: false,
            message: "Exam not found",
          });
        }
    }
  );

export const getUserExams =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const exams =
        await ExamModel.find({
          userId:
            req.user!.userId,
        });

      res.status(200).json({
        success: true,
        count:
          exams.length,
        exams,
      });
    }
  );

export const generateKnowledgeBaseExamController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const {
        documentIds,
        count = 10,
      } = req.body;

      const questions =
        await generateKnowledgeBaseExam({
          userId:
            req.user!.userId,

          documentIds,

          count,
        });

      res.status(200).json({
        success: true,
        count:
          questions.length,
        questions,
      });
    }
  );