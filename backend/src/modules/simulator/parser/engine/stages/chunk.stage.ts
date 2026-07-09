import { ParserContext } from "../parser-context";
import { BaseStage } from "./base.stage";

import { chunkModule } from "../../core/chunk-module";

export class ChunkStage extends BaseStage {

  name = "chunk";

  async execute(
    context: ParserContext
  ): Promise<void> {

    context.chunkResults = [];
    context.extractedQuestions = 0;

    for (const module of context.structure.modules) {

      this.log(`Chunking ${module.title}`);

      const chunks = chunkModule(
        module,
        3
      );

      for (const chunk of chunks) {

        context.chunkResults.push(chunk);

      }

    }

  }

}