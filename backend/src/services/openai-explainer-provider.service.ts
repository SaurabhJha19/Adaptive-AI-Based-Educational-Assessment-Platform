import OpenAI from "openai";

import { env }
from "../config/env";

import {
  ExplainerProvider,
  ExplainerResponse,
} from "./explainer-provider.service";

const openai =
  new OpenAI({
    apiKey:
      env.OPENAI_API_KEY,
  });

export class OpenAIExplainerProvider
  implements ExplainerProvider {

  async explain(
    question: string,
    context: string,
    sources: {
      chunkId: string;
      documentName: string;
      snippet: string;
    }[]
  ): Promise<ExplainerResponse> {

    const prompt = `
You are an educational AI tutor.

Answer the student's question ONLY using the provided study material.

Rules:

1. Be accurate.
2. Be concise but informative.
3. Do not invent facts.
4. If the answer is not in the notes, say:
   "The uploaded notes do not contain enough information to answer this question."

Student Question:

${question}

Study Material:

${context}
`;

    const response =
      await openai.chat.completions.create({
        model:
          env.QUESTION_MODEL,

        temperature: 0.3,

        messages: [
          {
            role: "system",
            content:
              "You are a helpful educational tutor.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const answer =
      response.choices[0]
        ?.message?.content;

    if (!answer) {

      throw new Error(
        "No response from OpenAI"
      );
    }

    return {
      answer,
      sources,
    };
  }
}