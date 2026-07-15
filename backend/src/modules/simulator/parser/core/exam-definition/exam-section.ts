import { ExamModule } from "./exam-module";

export type ExamSectionType =
    | "reading_writing"
    | "math"
    | "listening"
    | "speaking"
    | "writing"
    | "verbal"
    | "quantitative"
    | "analytical";

export interface ExamSection {

    id: string;

    title: string;

    type: ExamSectionType;

    pageStart: number;

    pageEnd: number;

    modules: ExamModule[];

}