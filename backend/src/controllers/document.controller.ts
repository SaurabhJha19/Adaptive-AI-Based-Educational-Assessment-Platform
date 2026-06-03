import { Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { AuthRequest } from "../middleware/auth.middleware";
import { createDocument } from "../services/document.service";
import { getUserDocuments} from "../services/document.service";
import fs from "fs";
import {
  getDocumentById,
  deleteDocumentRecord,
} from "../services/document.service";

export const uploadDocument = asyncHandler(
  async (
    req: AuthRequest,
    res: Response
  ) => {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const document =
      await createDocument({
        userId: req.user!.userId,
        originalName:
          req.file.originalname,
        fileName:
          req.file.filename,
        filePath:
          req.file.path,
        fileSize:
          req.file.size,
        mimeType:
          req.file.mimetype,
      });

    res.status(201).json({
      success: true,
      message:
        "Document uploaded successfully",
      document,
    });
  }
);

export const getDocuments =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const documents =
        await getUserDocuments(
          req.user!.userId
        );

      res.status(200).json({
        success: true,
        count: documents.length,
        documents,
      });
    }
  );

export const deleteDocument =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {

      const { id } = req.params;

      const document =
        await getDocumentById(
          id,
          req.user!.userId
        );

      if (!document) {
        return res.status(404).json({
          success: false,
          message:
            "Document not found",
        });
      }

      if (
        fs.existsSync(
          document.filePath
        )
      ) {
        fs.unlinkSync(
          document.filePath
        );
      }

      await deleteDocumentRecord(
        id,
        req.user!.userId
      );

      res.status(200).json({
        success: true,
        message:
          "Document deleted successfully",
      });
    }
  );