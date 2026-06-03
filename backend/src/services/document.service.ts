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