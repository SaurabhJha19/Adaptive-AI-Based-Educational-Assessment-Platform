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

parsed.sections.forEach((section: any) => {
    section.questionGroups.forEach(
        (group: any, index: number) => {
            group.order = index + 1;
        }
    );
});

  exam.sections = parsed.sections;

  let totalQuestions = 0;

  console.log(
    JSON.stringify(parsed.sections, null, 2)
  );

  for (const section of parsed.sections) {

    console.log(section.title);

    console.log(section.questionGroups);

    for (const group of section.questionGroups ?? []) {

      console.log(group.questions?.length);

      totalQuestions +=
        group.questions?.length ?? 0;
    }
  }

  exam.totalQuestions = totalQuestions;

  console.log("TOTAL =", totalQuestions);

  return exam;
}