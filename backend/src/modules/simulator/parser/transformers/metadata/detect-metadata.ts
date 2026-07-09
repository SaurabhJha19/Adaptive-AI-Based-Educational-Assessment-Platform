import { ParsedPage } from "../../extractors/pdf/split-pages";

export interface ExamMetadata {
  title: string;
  examCode: string;
  examType: string;
  provider: string;
  duration: number;
  modules: number;
}

export function detectMetadata(
  pages: ParsedPage[]
): ExamMetadata {

  const text = pages
    .map((p) => p.content)
    .join("\n");

  const title =
    text.match(/Practice Test\s+\d+/i)?.[0] ??
    "SAT Practice Test";

  const examCode =
    title.replace(/\s+/g, "-").toUpperCase();

  return {
    title,
    examCode,
    examType: "SAT",
    provider: "College Board",
    duration: 134,
    modules: 4,
  };
}