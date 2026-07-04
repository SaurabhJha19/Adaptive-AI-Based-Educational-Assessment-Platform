import openai from "../../../../../../config/openai";
import SAT_PARSER_PROMPT from "../prompts/sat.prompt";
import { LLMChunk } from "./chunk-builder";

export async function llmExtract(
  chunks: LLMChunk[]
) {
  const sections: any[] = [];

  for (const chunk of chunks) {
    console.log(`Parsing ${chunk.module}...`);

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1",
        temperature: 0,
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content: SAT_PARSER_PROMPT,
          },
          {
            role: "user",
            content: chunk.content,
          },
        ],
      });

    const parsed = JSON.parse(
      completion.choices[0].message.content ?? "{}"
    );

    if (parsed.sections) {
      sections.push(...parsed.sections);
    }
  }

  return {
    sections,
  };
}