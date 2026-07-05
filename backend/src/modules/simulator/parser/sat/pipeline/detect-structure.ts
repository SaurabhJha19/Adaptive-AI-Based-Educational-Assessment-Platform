import { ParsedPage } from "./split-pages";

export interface DetectedModule {
  title: string;
  order: number;
  pages: ParsedPage[];
}

export interface ExamStructure {
  modules: DetectedModule[];
}

function normalize(text: string) {
  return text
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function detectStructure(
  pages: ParsedPage[]
): ExamStructure {

  const modules: DetectedModule[] = [];

  let current: DetectedModule | null = null;

  for (const page of pages) {

    const text = normalize(page.content);

    if (
      /reading\s*(and|&)\s*writing.*module\s*1/.test(text)
    ) {

      current = {
        title: "Reading & Writing Module 1",
        order: 1,
        pages: [],
      };

      modules.push(current);

    } else if (
      /reading\s*(and|&)\s*writing.*module\s*2/.test(text)
    ) {

      current = {
        title: "Reading & Writing Module 2",
        order: 2,
        pages: [],
      };

      modules.push(current);

    } else if (
      /math.*module\s*1/.test(text)
    ) {

      current = {
        title: "Math Module 1",
        order: 3,
        pages: [],
      };

      modules.push(current);

    } else if (
      /math.*module\s*2/.test(text)
    ) {

      current = {
        title: "Math Module 2",
        order: 4,
        pages: [],
      };

      modules.push(current);
    }

    if (current) {
      current.pages.push(page);
    }
  }

  return {
    modules,
  };
}