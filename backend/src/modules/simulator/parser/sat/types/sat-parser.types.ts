export interface ParsedPage {

    page: number;

    content: string;

}

export interface ParsedModule {

    title: string;

    order: number;

    pages: ParsedPage[];

}

export interface ParsedQuestion {

    questionNumber: number;

    prompt: string;

    options: string[];

    answer?: string;

    explanation?: string;

}

export interface ParsedQuestionGroup {

    title?: string;

    passage?: string;

    questions: ParsedQuestion[];

}

export interface ParsedSection {

    title: string;

    order: number;

    questionGroups: ParsedQuestionGroup[];

}

export interface ParsedExam {

    sections: ParsedSection[];

}