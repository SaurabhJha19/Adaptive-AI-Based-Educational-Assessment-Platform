import { DocumentChunkModel }
from "../models/document-chunk.model";

export const retrieveRelevantChunks =
  async (
    userId: string,
    query: string,
    limit = 5
  ) => {

    const chunks =
      await DocumentChunkModel.find({
        userId,
        content: {
          $regex: query,
          $options: "i",
        },
      })
      .limit(limit);

    return chunks;
  };