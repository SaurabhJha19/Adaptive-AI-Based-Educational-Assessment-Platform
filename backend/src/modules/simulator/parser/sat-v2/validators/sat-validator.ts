import {
    ExamDefinition
} from "../../core/exam-definition";

export class SATValidator {

    validate(
        exam: ExamDefinition
    ): string[] {

        const errors: string[] = [];

        if (exam.sections.length !== 2) {

            errors.push(
                `Expected 2 sections. Found ${exam.sections.length}.`
            );

        }

        const modules =
            exam.sections.flatMap(
                section => section.modules
            );

        if (modules.length !== 4) {

            errors.push(
                `Expected 4 modules. Found ${modules.length}.`
            );

        }

        const totalQuestions =
            modules.reduce(

                (sum, module) =>

                    sum +
                    module.questions.length,

                0

            );

        if (totalQuestions !== 98) {

            errors.push(

                `Expected 98 questions. Found ${totalQuestions}.`

            );

        }

        return errors;

    }

}