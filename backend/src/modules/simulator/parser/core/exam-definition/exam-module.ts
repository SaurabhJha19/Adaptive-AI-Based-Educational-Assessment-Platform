import { ExamQuestion } from "./exam-question";

export interface ExamModule {

    id: string;

    index: number;

    title: string;

    pageStart: number;

    pageEnd: number;

    questions: ExamQuestion[];

}