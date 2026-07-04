import { ParsedPage } from "./split-pages";

export interface DetectedModule {
  title: string;
  order: number;
  pages: ParsedPage[];
}

export interface ExamStructure {
  modules: DetectedModule[];
}

export function detectStructure(
  pages: ParsedPage[]
): ExamStructure {

  const modules: DetectedModule[] = [];

  let current: DetectedModule | null = null;

  for (const page of pages) {

    const text = page.content;

    if (
      text.includes("Reading and Writing Module 1")
    ) {

      current = {
        title: "Reading & Writing Module 1",
        order: 1,
        pages: [],
      };

      modules.push(current);
    }

    else if (
      text.includes("Reading and Writing Module 2")
    ) {

      current = {
        title: "Reading & Writing Module 2",
        order: 2,
        pages: [],
      };

      modules.push(current);
    }

    else if (
      text.includes("Math Module 1")
    ) {

      current = {
        title: "Math Module 1",
        order: 3,
        pages: [],
      };

      modules.push(current);
    }

    else if (
      text.includes("Math Module 2")
    ) {

      current = {
        title: "Math Module 2",
        order: 4,
        pages: [],
      };

      modules.push(current);
    }

    current?.pages.push(page);

  }

  return {
    modules,
  };

}