import { Exam } from "./uem.interfaces";

export function buildUEMStatistics(
    exam: Exam
) {

    let modules = 0;

    let passages = 0;

    let questions = 0;

    let standalone = 0;

    for (const section of exam.sections) {

        modules += section.modules.length;

        for (const module of section.modules) {

            passages += module.passages.length;

            standalone += module.standaloneQuestions.length;

            for (const passage of module.passages) {

                questions += passage.questions.length;

            }

        }

    }

    return {

        sections: exam.sections.length,

        modules,

        passages,

        questions,

        standaloneQuestions: standalone,

    };

}