import { ParserContext } from "../parser-context";
import { BaseStage } from "./base.stage";

import { llmExtract } from "../../transformers/question/llm-extract";
import { mapLlmResponse } from "../../core/map-llm-response";

export class LlmStage extends BaseStage {

  name = "llm";

  async execute(
    context: ParserContext
  ): Promise<void> {

    const parsedChunks: any[] = [];

    for (const chunk of context.chunkResults ?? []) {

      const raw = await llmExtract(

        chunk,

        context.extractedQuestions ?? 0

      );

      const parsed = mapLlmResponse(

        raw,

        chunk.moduleTitle,

        chunk.moduleIndex

      );

      const count =
        parsed.sections
          ?.flatMap(
            (section: any) =>
              section.questionGroups ?? []
          )
          ?.flatMap(
            (group: any) =>
              group.questions ?? []
          )
          ?.length ?? 0;

      context.extractedQuestions =
        (context.extractedQuestions ?? 0) +
        count;

      parsedChunks.push(parsed);

    }

    context.parsedChunks = parsedChunks;

  }

}