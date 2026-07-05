export function mapLlmResponse(
    response: any,
    fallbackSection: string,
    sectionOrder: number
) {

    if (!response?.sections?.length) {

        return {

            sections: [],

        };

    }

    return {

        sections: response.sections.map(
            (section: any) => ({

                title:
                    section.title?.trim() ||
                    fallbackSection,

                order:
                    section.order ??
                    sectionOrder,

                questionGroups:
                    (section.questionGroups ?? []).map(
                        (
                            group: any,
                            index: number
                        ) => ({

                            title:
                                group.title ?? "",

                            order:
                                group.order ??
                                index + 1,

                            passage:
                                group.passage ??
                                "",

                            questions:
    (group.questions ?? [])
        .map((question: any, index: number) => ({

            questionNumber:
                question.questionNumber ??
                question.number ??
                index + 1,

            prompt:
                (
                    question.prompt ??
                    question.question ??
                    ""
                ).trim(),

            options:
                (
                    question.options ??
                    question.choices ??
                    []
                ).filter(Boolean),

            correctAnswer:
                question.correctAnswer ??
                question.answer ??
                "",

            answer:
                question.answer ??
                question.correctAnswer ??
                "",

            explanation:
                question.explanation ?? "",

            difficulty:
                question.difficulty ?? "MEDIUM",

            type:
                question.type ?? "MULTIPLE_CHOICE",

            metadata:
                question.metadata ?? {},

        }))
        .filter((question: any) => {

            if (!question.prompt) {

                console.warn(
                    `Dropped question ${question.questionNumber}: missing prompt`
                );

                return false;

            }

            return true;

        }),

                        })

                    ),

            })

        ),

    };

}