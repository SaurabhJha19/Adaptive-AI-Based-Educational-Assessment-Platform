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
    limit = 5,
    documentIds?: string[]
  ) => {

    const queryEmbedding =
      await generateEmbedding(
        query
      );

    const filter: any = {
      userId:
        new mongoose.Types.ObjectId(
          userId
        ),
    };

    if (
      documentIds &&
      documentIds.length > 0
    ) {

      filter.documentId = {
        $in:
          documentIds.map(
            (id) =>
              new mongoose.Types.ObjectId(
                id
              )
          ),
      };
    }

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

            filter,
          },
        },
      ]);

    return results;
  };