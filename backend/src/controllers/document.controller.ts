import { Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { AuthRequest } from "../middleware/auth.middleware";
import { createDocument } from "../services/document.service";

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