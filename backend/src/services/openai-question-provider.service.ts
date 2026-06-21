import OpenAI from "openai";

import { env }
from "../config/env";

import {
  GeneratedQuestion,
  QuestionProvider,
}
from "./question-provider.service";

const openai =
  new OpenAI({
    apiKey:
      env.OPENAI_API_KEY,
  });

export class OpenAIQuestionProvider
  implements QuestionProvider {

  async generateQuestions(
    context: string,
    difficulty:
      | "easy"
      | "medium"
      | "hard",
    count: number
  ): Promise<
    GeneratedQuestion[]
  > {

    const prompt = `
You are an expert educational assessment generator.

Based ONLY on the provided context,
generate ${count} multiple choice questions.

Difficulty:
${difficulty}

Rules:

1. Return ONLY valid JSON.
2. No markdown.
3. No explanations outside JSON.
4. Cover DIFFERENT concepts.
5. Avoid duplicate questions.
6. Use different sections of the notes.
7. Mix factual and conceptual questions.
8. Four options each.
9. One correct answer.
10. Each question must have:
   - question
   - options (4 options)
   - answer
   - difficulty
   - topic

JSON Format:

[
  {
    "question": "...",
    "options": [
      "...",
      "...",
      "...",
      "..."
    ],
    "answer": "...",
    "difficulty": "${difficulty}",
    "topic": "..."
  }
]

Context:

${context}

Generate questions that cover as many different topics from the context as possible.

Do not create multiple questions testing the same idea.
`;

    const response =
      await openai.chat.completions.create({
        model:
          env.QUESTION_MODEL,

        temperature: 0.7,

        messages: [
          {
            role: "system",
            content:
              "You generate educational MCQ questions in JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const content =
      response.choices[0]
        ?.message?.content;

    if (!content) {
      throw new Error(
        "No response from OpenAI"
      );
    }

    try {

      const parsed =
        JSON.parse(
          content
        );

      return parsed;

    } catch {

      throw new Error(
        "Failed to parse OpenAI JSON response"
      );
    }
  }
}