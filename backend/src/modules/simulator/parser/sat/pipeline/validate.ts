export function validateExam(
    exam: any
) {

    if (
        !exam.sections?.length
    ) {

        throw new Error(
            "No sections extracted."
        );

    }

    let totalQuestions = 0;

    for (
        const section of exam.sections
    ) {

        if (
            !section.questionGroups?.length
        ) {

            throw new Error(
                `${section.title} has no question groups.`
            );

        }

        for (
            const group of section.questionGroups
        ) {

            if (
                !group.questions?.length
            ) {

                console.warn(
                    `${section.title} contains an empty question group.`
                );

                continue;

            }

            totalQuestions +=
                group.questions.length;

        }

    }

    if (totalQuestions < 90) {

        throw new Error(
            `Parser extracted only ${totalQuestions} questions.`
        );

    }

    return exam;

}