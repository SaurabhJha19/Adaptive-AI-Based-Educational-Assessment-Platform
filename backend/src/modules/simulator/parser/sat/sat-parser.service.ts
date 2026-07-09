import { OfficialExamParser } from "../official-exam-parser.interface";
import { IOfficialExam } from "../../models/official-exam.model";

import { AdapterRegistry } from "../adapters";

class SatParserService
implements OfficialExamParser {

async parse(
  exam: IOfficialExam
): Promise<IOfficialExam> {

  return AdapterRegistry
    .get("SAT")
    .parse(exam);

}

}

export default new SatParserService();