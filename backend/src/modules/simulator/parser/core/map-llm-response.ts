import { ParsedDocument } from "../engine/contracts";


const normalizeType = (type?: string) => {

    switch ((type ?? "").trim().toLowerCase()) {

        case "multiple choice":
        case "multiple_choice":
        case "mcq":
            return "MULTIPLE_CHOICE";

        case "student response":
        case "student_response":
        case "grid_in":
            return "STUDENT_RESPONSE";

        default:
            return "MULTIPLE_CHOICE";

    }

};

export function mapLlmResponse(
    response: ParsedDocument,
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
    ) => {

        const passage =
            group.passage ?? "";

        return {

            title:
                group.title ?? "",

            order:
                group.order ??
                index + 1,

            passage,

            content:

                passage

                ? [

                    {

                        type: "paragraph",

                        data: {

                            text: passage,

                        },

                    },

                ]

                : [],

            questions:

                (group.questions ?? [])
                    .map((question: any, index: number) => {

                        const prompt =
                            (
                                question.prompt ??
                                question.question ??
                                ""
                            ).trim();

                        return {

                            questionNumber:
                                question.questionNumber ??
                                question.number ??
                                index + 1,

                            prompt,

                            content: [

                                {

                                    type: "paragraph",

                                    data: {

                                        text: prompt,

                                    },

                                },

                            ],

                            options:
                                (
                                    question.options ??
                                    question.choices ??
                                    []
                                )
                                .filter(
                                    (option: any) =>
                                        typeof option === "string" &&
                                        /^[A-D]\)/.test(option.trim())
                                ),

                            correctAnswer:

                                question.correctAnswer ??

                                question.answer ??

                                question.correct_option ??

                                question.correctOption ??

                                "",

                            answer:
                                question.answer ??
                                question.correctAnswer ??
                                "",

                            explanation:
                                question.explanation ??
                                "",

                            difficulty:
                                question.difficulty ??
                                "MEDIUM",

                           type: normalizeType(question.type),

                            metadata:
                                question.metadata ??
                                {},

                        };

                    })
                    .filter((question: any) => {

                        if (!question.prompt) {

                            console.warn(
                                `Dropped question ${question.questionNumber}: missing prompt`
                            );

                            return false;

                        }

                        return true;

                    }),

        };

    }
),                        })

                    ),



    };

}