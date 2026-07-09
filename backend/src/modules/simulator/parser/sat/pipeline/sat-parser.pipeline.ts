import { IOfficialExam } from "../../../models/official-exam.model";

import {
  ParserEngine,
  createDefaultPipeline,
} from "../../engine";

class SatParserPipeline {

  async execute(
    exam: IOfficialExam
  ): Promise<IOfficialExam> {

    console.log("================================");
    console.log("STARTING SAT PARSER");
    console.log("================================");

    const pipeline =
      createDefaultPipeline();

    const engine =
      new ParserEngine(
        pipeline.getStages()
      );

    const context: any = {

      exam,

    };

    await engine.run(context);

    return exam;

  }

}

export default new SatParserPipeline();