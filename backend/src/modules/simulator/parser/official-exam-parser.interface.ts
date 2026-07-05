import { IOfficialExam } from "../models/official-exam.model";

export interface OfficialExamParser {
  parse(
    exam: IOfficialExam
  ): Promise<IOfficialExam>;
}