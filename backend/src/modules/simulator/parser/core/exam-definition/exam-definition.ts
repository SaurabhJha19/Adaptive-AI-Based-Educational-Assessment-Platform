import { ExamSection } from "./exam-section";

export type ExamType =
    | "sat"
    | "gre"
    | "toefl"
    | "ielts"
    | "gmat"
    | "custom";

export interface ExamMetadata {

    sourceFile?: string;

    answerKeyFile?: string;

    createdAt?: Date;

    parserVersion?: string;

    durationMinutes?: number;

    totalQuestions?: number;

    organization?: string;

    year?: number;

    [key: string]: any;

}

export interface ExamDefinition {

    id: string;

    examType: ExamType;

    title: string;

    version?: string;

    metadata: ExamMetadata;

    sections: ExamSection[];

}