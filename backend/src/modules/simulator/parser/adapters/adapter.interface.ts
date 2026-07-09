import { IOfficialExam } from "../../models/official-exam.model";

export interface ExamParserAdapter {

  parse(
    exam: IOfficialExam
  ): Promise<IOfficialExam>;

}