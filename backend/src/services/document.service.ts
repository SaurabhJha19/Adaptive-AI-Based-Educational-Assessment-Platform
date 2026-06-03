import { DocumentModel } from "../models/document.model";

interface CreateDocumentInput {
  userId: string;
  originalName: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
}

export const createDocument = async (
  data: CreateDocumentInput
) => {
  const document = await DocumentModel.create({
    userId: data.userId,
    originalName: data.originalName,
    fileName: data.fileName,
    filePath: data.filePath,
    fileSize: data.fileSize,
    mimeType: data.mimeType,
    status: "uploaded",
  });

  return document;
};

export const getUserDocuments = async (
  userId: string
) => {
  return await DocumentModel
    .find({ userId })
    .sort({ createdAt: -1 });
};

export const getDocumentById = async (
  documentId: string,
  userId: string
) => {
  return await DocumentModel.findOne({
    _id: documentId,
    userId,
  });
};

export const deleteDocumentRecord = async (
  documentId: string,
  userId: string
) => {
  return await DocumentModel.findOneAndDelete({
    _id: documentId,
    userId,
  });
};