import OpenAI from "openai";

import { env } from "../config/env";

const openai =
  new OpenAI({
    apiKey:
      env.OPENAI_API_KEY,
  });

export const generateEmbedding =
  async (
    text: string
  ): Promise<number[]> => {

    if (
      env.OPENAI_API_KEY ===
      "API_PENDING_KEY"
    ) {

      console.log(
        "OpenAI key pending. Using mock embedding."
      );

      return Array(1536).fill(0);
    }

    const response =
      await openai.embeddings.create({
        model:
          env.EMBEDDING_MODEL,
        input: text,
      });

    return response.data[0].embedding;
  };