export interface ParsedModule {
  title: string;
  order: number;
  rawText: string;
}

export interface ParsedQuestionGroup {
  title?: string;
  passage?: string;
  questions: ParsedQuestion[];
}

export interface ParsedQuestion {
  questionNumber: number;
  prompt: string;
  options: string[];
  answer?: string;
  explanation?: string;
}

export interface ParsedExam {
  modules: ParsedModule[];
}