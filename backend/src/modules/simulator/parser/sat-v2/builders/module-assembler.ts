import { randomUUID } from "crypto";

import {
    ExamModule,
    ExamQuestion,
    ExamSection
} from "../../core/exam-definition";

import { ModuleBoundary } from "../detectors/module-detector";

export class ModuleAssembler {

    assemble(

        boundaries: ModuleBoundary[],

        questions: ExamQuestion[]

    ): ExamSection[] {

        const sections = new Map<
            string,
            ExamSection
        >();

        for (const boundary of boundaries) {

            const moduleQuestions =
                questions.filter(

                    question =>

                        question.page >=
                            boundary.pageStart &&

                        question.page <=
                            boundary.pageEnd

                );

            const module: ExamModule = {

                id: randomUUID(),

                index: boundary.module,

                title: `Module ${boundary.module}`,

                pageStart:
                    boundary.pageStart,

                pageEnd:
                    boundary.pageEnd,

                questions:
                    moduleQuestions

            };

            let section =
                sections.get(
                    boundary.section
                );

            if (!section) {

                section = {

                    id: randomUUID(),

                    title:
                        boundary.section ===
                        "reading_writing"

                            ? "Reading & Writing"

                            : "Math",

                    type:
                        boundary.section,

                    pageStart:
                        boundary.pageStart,

                    pageEnd:
                        boundary.pageEnd,

                    modules: []

                };

                sections.set(
                    boundary.section,
                    section
                );

            }

            section.modules.push(
                module
            );

            section.pageStart =
                Math.min(
                    section.pageStart,
                    boundary.pageStart
                );

            section.pageEnd =
                Math.max(
                    section.pageEnd,
                    boundary.pageEnd
                );

        }

        return [
            ...sections.values()
        ];

    }

}