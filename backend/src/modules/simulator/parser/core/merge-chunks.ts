export function mergeChunks(
    results: any[]
) {

    const sections =
        new Map<string, any>();

    for (const result of results) {

        for (
            const section of result.sections ?? []
        ) {

            const title =
                section.title.trim();

            if (!sections.has(title)) {

                sections.set(
                    title,
                    {

                        title,

                        order:
                            section.order,

                        questionGroups: [],

                    }
                );

            }

            const merged =
                sections.get(title);

            merged.questionGroups.push(
                ...section.questionGroups
            );

        }

    }

    for (
        const section of sections.values()
    ) {

        const questions =
            section.questionGroups.flatMap(
                (group: any) =>
                    group.questions
            );

        questions.sort(

            (
                a: any,
                b: any
            ) =>

                a.questionNumber -
                b.questionNumber

        );

        section.questionGroups = [

            {

                title: "",

                order: 1,

                passage: "",

                questions,

            },

        ];

    }

    return {

        sections:
            Array.from(
                sections.values()
            ),

    };

}