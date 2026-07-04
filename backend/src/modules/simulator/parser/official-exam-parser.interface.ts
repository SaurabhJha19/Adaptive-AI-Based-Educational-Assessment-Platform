import OfficialExam from "../models/official-exam.model";

export interface OfficialExamParser {
  parse(
    exam: OfficialExam
  ): Promise<OfficialExam>;
}