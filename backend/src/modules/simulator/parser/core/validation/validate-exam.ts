import {
    validateSection,
} from "./validate-section";

export function
validateExam(
    exam: any
) {

    if (

        !exam.sections?.length

    ) {

        throw new Error(
            "Exam contains no sections."
        );

    }

    for (

        const section

        of exam.sections

    ) {

        validateSection(
            section
        );

    }

}