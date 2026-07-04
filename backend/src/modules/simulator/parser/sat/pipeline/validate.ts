import { IOfficialExam } from "../../../models/official-exam.model";

export function validateExam(
  exam: IOfficialExam
) {

  if (!exam.sections.length) {
    throw new Error(
      "No sections extracted."
    );
  }

  if (!exam.totalQuestions) {
    throw new Error(
      "No questions extracted."
    );
  }

}