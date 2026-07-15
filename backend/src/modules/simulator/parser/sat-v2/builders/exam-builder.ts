import { randomUUID } from "crypto";

import {
    ExamDefinition,
    ExamSection
} from "../../core/exam-definition";

import { ExamType } from "../../core/exam-definition";

export interface BuildExamOptions {

    examType: ExamType;

    title: string;

    parserVersion?: string;

    sections: ExamSection[];

}

export class ExamBuilder {

    build(
        options: BuildExamOptions
    ): ExamDefinition {

        const totalQuestions =
            options.sections.reduce(

                (sectionTotal, section) =>

                    sectionTotal +

                    section.modules.reduce(

                        (moduleTotal, module) =>

                            moduleTotal +
                            module.questions.length,

                        0

                    ),

                0

            );

        return {

            id: randomUUID(),

            examType:
                options.examType,

            title:
                options.title,

            metadata: {

                parserVersion:
                    options.parserVersion ??
                    "2.0.0",

                totalQuestions,

                totalSections:
                    options.sections.length,

                totalModules:
                    options.sections.reduce(

                        (sum, section) =>

                            sum +
                            section.modules.length,

                        0

                    )

            },

            sections:
                options.sections

        };

    }

}