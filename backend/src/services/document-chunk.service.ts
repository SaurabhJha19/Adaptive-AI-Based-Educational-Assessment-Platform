import { DocumentChunkModel }
from "../models/document-chunk.model";

import {
  generateEmbedding
} from "./embedding.service";

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
      await Promise.all(

        chunks.map(
          async (
            content,
            index
          ) => {

            const embedding =
              await generateEmbedding(
                content
              );

            return {
              documentId,
              userId,
              chunkIndex:
                index,
              content,
              embedding,
            };
          }
        )
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