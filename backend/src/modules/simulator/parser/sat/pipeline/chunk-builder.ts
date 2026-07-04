import { ExamStructure } from "./detect-structure";

export interface LLMChunk {
  module: string;
  order: number;
  content: string;
}

export function buildChunks(
  structure: ExamStructure
): LLMChunk[] {

  return structure.modules.map((module) => ({
    module: module.title,
    order: module.order,
    content: module.pages
      .map((p) => p.content)
      .join("\n"),
  }));

}