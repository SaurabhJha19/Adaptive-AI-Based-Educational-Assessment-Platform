import { Response }
from "express";

import {
  AuthRequest,
}
from "../middleware/auth.middleware";

import { asyncHandler }
from "../utils/async-handler";

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


      const questions =
        await generateQuestions({
          userId:
            req.user!.userId,

          documentId,

 
        });

      res.status(201).json({
        success: true,
        count:
          questions.length,
        questions,
      });
    }
  );