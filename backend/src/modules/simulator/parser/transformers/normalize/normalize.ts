import { IOfficialExam } from "../../../models/official-exam.model";

export function normalizeExam(
  parsed: any,
  metadata: any,
  exam: IOfficialExam
): IOfficialExam {

/*
|--------------------------------------------------------------------------
| Preserve admin metadata.
| Never overwrite uploaded values.
|--------------------------------------------------------------------------
*/

exam.metadata = {

    ...(exam.metadata ?? {}),

    detectedTitle:
        metadata.title,

    detectedExamCode:
        metadata.examCode,

    detectedExamType:
        metadata.examType,

    detectedDuration:
        metadata.duration,

};

parsed.sections.forEach((section: any) => {
    section.questionGroups.forEach(
        (group: any, index: number) => {
            group.order = index + 1;
        }
    );
});

  exam.sections = parsed.sections;

  let totalQuestions = 0;

  for (
      const section of exam.sections
  ) {

      for (
          const group of section.questionGroups
      ) {

          totalQuestions +=
              group.questions.length;

      }

  }

  exam.totalQuestions =
      totalQuestions;

  return exam;
}