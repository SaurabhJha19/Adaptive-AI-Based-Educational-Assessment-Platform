import { DocumentChunkModel }
from "../models/document-chunk.model";

interface ChunkInput {
  documentId: string;
  userId: string;
  chunks: string[];
}

export const saveChunks =
  async ({
    documentId,
    userId,
    chunks,
  }: ChunkInput) => {

    const chunkDocs =
      chunks.map(
        (
          content,
          index
        ) => ({
          documentId,
          userId,
          chunkIndex: index,
          content,
        })
      );

    return await
      DocumentChunkModel.insertMany(
        chunkDocs
      );
  };

export const getDocumentChunks =
  async (
    documentId: string,
    userId: string
  ) => {

    return await
      DocumentChunkModel
        .find({
          documentId,
          userId,
        })
        .sort({
          chunkIndex: 1,
        });
  };