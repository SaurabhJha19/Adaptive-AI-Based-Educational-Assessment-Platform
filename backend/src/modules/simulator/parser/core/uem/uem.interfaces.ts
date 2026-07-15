import { AnyBlock } from "../../../document/core";

import {

    AssetType,
    ExamType,
    QuestionType,
    SectionType,

} from "./uem.types";

export interface Exam {

    id: string;

    type: ExamType;

    title: string;

    sections: ExamSection[];

    metadata: Record<string, unknown>;

}

export interface ExamSection {

    id: string;

    type: SectionType;

    title: string;

    modules: ExamModule[];

    pageStart: number;

    pageEnd: number;

}

export interface ExamModule {

    id: string;

    index: number;

    title: string;

    pageStart: number;

    pageEnd: number;

    passages: Passage[];

    standaloneQuestions: Question[];

}

export interface Passage {

    id: string;

    title?: string;

    pageStart: number;

    pageEnd: number;

    blocks: AnyBlock[];

    questions: Question[];

}

export interface Question {

    id: string;

    number: number;

    type: QuestionType;

    page: number;

    stem: AnyBlock[];

    options: QuestionOption[];

    assets: QuestionAsset[];

    explanation?: string;

    correctAnswer?: string;

}

export interface QuestionOption {

    id: string;

    label: string;

    blocks: AnyBlock[];

}

export interface QuestionAsset {

    id: string;

    type: AssetType;

    blocks: AnyBlock[];

}