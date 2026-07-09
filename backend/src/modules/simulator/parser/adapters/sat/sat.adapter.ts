import { IOfficialExam } from "../../../models/official-exam.model";
import { ExamParserAdapter } from "../adapter.interface";

import { ParserEngine } from "../../engine";
import { createSatPipeline } from "./sat.pipeline";

export class SatAdapter implements ExamParserAdapter {

  private readonly engine =
    new ParserEngine(
      createSatPipeline().getStages()
    );

  async parse(
    exam: IOfficialExam
  ): Promise<IOfficialExam> {

    await this.engine.run({

      exam,

    });

    return exam;

  }

}