import { ParserChunk } from "./chunk-module";
import { SAT_PROMPT } from "../sat/prompts/sat.prompt";

export interface ParserContext {

    system: string;

    user: string;

}

export function buildContext(
    chunk: ParserChunk,
    extractedQuestionCount: number
): ParserContext {

    return {

        system: SAT_PROMPT,

       user: `
Module:
${chunk.moduleTitle}

Chunk:
${chunk.chunkIndex}/${chunk.totalChunks}

Pages:
${chunk.startPage}-${chunk.endPage}

Questions already extracted:
${extractedQuestionCount}

Extract ONLY the questions present in this chunk.

Return ONLY valid JSON.

Return exactly this schema:

{
  "sections": [
    {
      "title": "string",
      "questionGroups": [
        {
          "title": "string",
          "passage": "string",
          "questions": [
            {
              "number": 1,
              "question": "string",
              "choices": [
                "A) ...",
                "B) ...",
                "C) ...",
                "D) ..."
              ],
              "correctAnswer": "A",
              "type": "MULTIPLE_CHOICE",
              "difficulty": "EASY | MEDIUM | HARD",
              "explanation": "string"
            }
          ]
        }
      ]
    }
  ]
}

Rules:

- Every question MUST include correctAnswer.
- correctAnswer MUST be exactly one of: A, B, C, D.
- Every multiple choice question MUST have four choices.
- Never invent questions.
- Never omit answers if an answer key exists in the provided pages.
- Preserve passages exactly.
- Preserve tables.
- Preserve equations.
- Preserve figures.
- Preserve question numbering.
- Return ONLY JSON.

================================================

DOCUMENT CONTENT

================================================

${chunk.content}
`.trim(),

    };

}