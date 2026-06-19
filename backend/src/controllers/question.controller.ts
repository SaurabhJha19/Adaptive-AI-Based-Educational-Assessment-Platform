import { Response }
from "express";

import {
  AuthRequest,
}
from "../middleware/auth.middleware";

import { asyncHandler }
from "../utils/async-handler";

import {
  DocumentChunkModel
}
from "../models/document-chunk.model";

import {
  generateQuestions
}
from "../services/question-generator.service";

export const createQuestions =
  asyncHandler(
    async (
        req: AuthRequest,  res: Response
    ) => {

      const {
        documentId
      } = req.body;

      const chunks =
        await DocumentChunkModel.find({
          documentId,
          userId:
            req.user?.userId,
        });

      const questions =
        await generateQuestions({
          userId:
            req.user!.userId,

          documentId,

          chunks:
            chunks.map(
              c => c.content
            ),
        });

      res.status(201).json({
        success: true,
        count:
          questions.length,
        questions,
      });
    }
  );