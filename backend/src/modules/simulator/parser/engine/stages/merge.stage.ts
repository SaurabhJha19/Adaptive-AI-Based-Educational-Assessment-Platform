import { BaseStage } from "./base.stage";

import { mergeChunks } from "../../core/merge-chunks";
import { deduplicate } from "../../core/deduplicate";

export class MergeStage extends BaseStage {

  name = "merge";

  async execute(context: any): Promise<void> {

    context.parsed = mergeChunks(
      context.parsedChunks
    );

    context.parsed = deduplicate(
      context.parsed
    );

  }

}