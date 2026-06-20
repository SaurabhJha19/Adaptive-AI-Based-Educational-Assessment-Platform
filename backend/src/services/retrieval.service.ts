import mongoose from "mongoose";

import {
  DocumentChunkModel,
} from "../models/document-chunk.model";

import {
  generateEmbedding,
} from "./embedding.service";

export const retrieveRelevantChunks =
  async (
    userId: string,
    query: string,
    limit = 5
  ) => {

    const queryEmbedding =
      await generateEmbedding(
        query
      );

    const results =
      await DocumentChunkModel.aggregate([
        {
          $vectorSearch: {
            index:
              "document_chunks_vector_index",

            path:
              "embedding",

            queryVector:
              queryEmbedding,

            numCandidates:
              100,

            limit,

            filter: {
              userId: new mongoose.Types.ObjectId(
                userId
              ),
            },
          },
        },
      ]);

    return results;
  };