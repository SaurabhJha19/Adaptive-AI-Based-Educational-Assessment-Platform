export function deduplicate(
    parsed: any
) {

    for (
        const section of parsed.sections
    ) {

        for (
            const group of section.questionGroups
        ) {

            const seen =
                new Set();

            group.questions =
                group.questions.filter(
                    (question: any) => {

                        const key =
                            question.questionNumber;

                        if (
                            seen.has(key)
                        ) {

                            return false;

                        }

                        seen.add(key);

                        return true;

                    }
                );

        }

    }

    return parsed;

}