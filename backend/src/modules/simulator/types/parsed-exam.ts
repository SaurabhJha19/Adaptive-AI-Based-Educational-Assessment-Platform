export type SectionType =
  | "reading"
  | "listening"
  | "speaking"
  | "writing";

export interface ParsedExam {
  title: string;
  examCode: string;
  examType: string;
  sections: ParsedSection[];
}

export interface ParsedSection {
  type: SectionType;
  title?: string;
  sharedContent: string;
  groups: ParsedGroup[];
}

export interface ParsedGroup {
  instructions?: string;
  questions: ParsedQuestion[];
}

export interface ParsedQuestion {
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}