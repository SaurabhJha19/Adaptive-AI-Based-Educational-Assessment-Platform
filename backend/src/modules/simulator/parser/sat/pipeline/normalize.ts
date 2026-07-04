import { IOfficialExam } from "../../../models/official-exam.model";

export function normalizeExam(
  parsed: any,
  metadata: any,
  exam: IOfficialExam
): IOfficialExam {

  exam.title = metadata.title;
  exam.examCode = metadata.examCode;
  exam.examType = metadata.examType;
  exam.duration = metadata.duration;

  exam.sections = parsed.sections;

  let totalQuestions = 0;

  for (const section of exam.sections) {

    for (const group of section.questionGroups) {

      totalQuestions +=
        group.questions.length;

    }

  }

  exam.totalQuestions =
    totalQuestions;

  return exam;
}