export interface ParsedQuestionBlock {

    questionNumber: number;

    content: string;

}

export function splitQuestions(
    text: string
): ParsedQuestionBlock[] {

    text = text

        .replace(
            /CONTINUE\s+\d+\s+Module\s+\d+/gi,
            ""
        )

        .replace(
            /Module\s+\d+/gi,
            ""
        )

        .replace(
            /Unauthorized copying.*?illegal\./gis,
            ""
        );

    const regex =
        /(?<=^|\n|\.\s)(\d{1,2})\s+(?=[A-Z])/g;

    const matches =
        [...text.matchAll(regex)];

    const questions: ParsedQuestionBlock[] = [];

    for (let i = 0; i < matches.length; i++) {

        const start =
            matches[i].index!;

        const end =
            i === matches.length - 1
                ? text.length
                : matches[i + 1].index!;

        questions.push({

            questionNumber:
                Number(matches[i][1]),

            content:
                text
                    .substring(start, end)
                    .trim(),

        });

    }

    return questions;

}