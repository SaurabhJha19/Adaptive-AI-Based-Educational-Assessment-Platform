import { BaseStage } from "./base.stage";

import { persistExam } from "../../sat/pipeline/persist";

export class PersistStage extends BaseStage {

  name = "persist";

  async execute(context: any): Promise<void> {

    await persistExam(context.exam);

  }

}