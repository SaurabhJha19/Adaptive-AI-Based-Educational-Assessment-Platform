import OpenAI from "openai";
import { env } from "../config/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const generateEmbedding =
  async (
    text: string
  ): Promise<number[]> => {

    const response =
      await openai.embeddings.create({
        model:
          env.EMBEDDING_MODEL,
        input: text,
      });

    return response.data[0].embedding;
  };