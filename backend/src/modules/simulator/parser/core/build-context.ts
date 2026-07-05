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

${chunk.content}
        `.trim(),

    };

}