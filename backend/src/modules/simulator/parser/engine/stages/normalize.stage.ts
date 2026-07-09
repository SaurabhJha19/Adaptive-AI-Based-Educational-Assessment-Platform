import { BaseStage } from "./base.stage";

import { normalizeExam } from "../../transformers/normalize/normalize";

export class NormalizeStage extends BaseStage {

  name = "normalize";

  async execute(context: any): Promise<void> {

    context.parsed = normalizeExam(

      context.parsed,

      context.metadata,

      context.exam

    );

  }

}