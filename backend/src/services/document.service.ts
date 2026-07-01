import { DocumentModel } from "../models/document.model";

interface CreateDocumentInput {
  userId: string;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  s3Key: string;
  s3Url: string;
}

export const createDocument =
  async (
    data: CreateDocumentInput
  ) => {

    return await DocumentModel.create({

      userId:
        data.userId,

      originalName:
        data.originalName,

      fileName:
        data.fileName,

      filePath: "",

      fileSize:
        data.fileSize,

      mimeType:
        data.mimeType,

      s3Key:
        data.s3Key,

      s3Url:
        data.s3Url,

      status:
        "uploaded",
    });
  };

export const getUserDocuments =
  async (
    userId: string
  ) => {

    return DocumentModel
      .find({
        userId,
      })
      .sort({
        createdAt: -1,
      });
  };

export const getDocumentById =
  async (
    documentId: string,
    userId: string
  ) => {

    return DocumentModel.findOne({
      _id: documentId,
      userId,
    });
  };

export const deleteDocumentRecord =
  async (
    documentId: string,
    userId: string
  ) => {

    return DocumentModel.findOneAndDelete({
      _id: documentId,
      userId,
    });
  };

export const updateDocumentStatus =
  async (
    documentId: string,
    status:
      | "processing"
      | "processed"
      | "failed"
  ) => {

    return DocumentModel.findByIdAndUpdate(
      documentId,
      {
        status,
      },
      {
        new: true,
      }
    );
  };