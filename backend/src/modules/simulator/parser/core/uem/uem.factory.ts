import { randomUUID } from "crypto";

import {

    Exam,
    ExamModule,
    ExamSection,
    Passage,
    Question,

} from "./uem.interfaces";

import {

    ExamType,
    QuestionType,
    SectionType,

} from "./uem.types";

export function createExam(): Exam {

    return {

        id: randomUUID(),

        type: ExamType.CUSTOM,

        title: "",

        sections: [],

        metadata: {},

    };

}

export function createSection(): ExamSection {

    return {

        id: randomUUID(),

        type: SectionType.UNKNOWN,

        title: "",

        modules: [],

        pageStart: 0,

        pageEnd: 0,

    };

}

export function createModule(): ExamModule {

    return {

        id: randomUUID(),

        index: 0,

        title: "",

        pageStart: 0,

        pageEnd: 0,

        passages: [],

        standaloneQuestions: [],

    };

}

export function createPassage(): Passage {

    return {

        id: randomUUID(),

        pageStart: 0,

        pageEnd: 0,

        blocks: [],

        questions: [],

    };

}

export function createQuestion(): Question {

    return {

        id: randomUUID(),

        number: 0,

        page: 0,

        type: QuestionType.UNKNOWN,

        stem: [],

        options: [],

        assets: [],

    };

}