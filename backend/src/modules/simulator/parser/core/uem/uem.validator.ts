import { Exam } from "./uem.interfaces";

export class UEMValidator {

    validate(
        exam: Exam
    ) {

        if (!exam.sections.length) {

            throw new Error(
                "Exam has no sections."
            );

        }

        for (const section of exam.sections) {

            if (!section.modules.length) {

                throw new Error(
                    `Section "${section.title}" has no modules.`
                );

            }

        }

        return true;

    }

}