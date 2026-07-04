import { OfficialExamParser } from "../official-exam-parser.interface";
import { IOfficialExam } from "../../models/official-exam.model";

import satParserPipeline from "./pipeline/sat-parser.pipeline";

class SatParserService implements OfficialExamParser {
  async parse(
    exam: IOfficialExam
  ): Promise<IOfficialExam> {
    return satParserPipeline.execute(exam);
  }
}

export default new SatParserService();