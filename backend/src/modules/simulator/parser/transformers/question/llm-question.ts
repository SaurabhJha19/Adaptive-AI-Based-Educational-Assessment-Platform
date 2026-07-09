import openai from "../../../../../config/openai";

import { ParsedQuestionBlock } from "../../core/split-questions";
import { buildQuestionContext } from "../../core/build-question-context";

export async function llmQuestion(
    question: ParsedQuestionBlock
) {

    const context =
        buildQuestionContext(
            question.content
        );

    const response =
        await openai.chat.completions.create({

            model: "gpt-4.1",

            temperature: 0,

            response_format: {
                type: "json_object",
            },

            messages: [

                {
                    role: "system",

                    content: `
You are an expert SAT parser.

You will receive EXACTLY ONE SAT question.

Rules:

1. Return EXACTLY ONE question.
2. Copy the question text exactly.
3. Copy all answer choices exactly.
4. Preserve equations.
5. Preserve punctuation.
6. Preserve tables if present.
7. Preserve passages if attached.
8. If the answer is not visible, return an empty string.
9. Do NOT omit the prompt.
10. Return ONLY valid JSON.

Schema:

{
    "questionNumber": 0,
    "prompt": "",
    "options": [],
    "correctAnswer": "",
    "explanation": ""
}
                    `.trim(),
                },

                {
                    role: "user",
                    content: context.user,
                },

            ],

        });

    const content =
        response.choices[0]
            .message.content;

    if (!content) {

        throw new Error(
            `Empty response for question ${question.questionNumber}`
        );

    }

    const parsed =
        JSON.parse(content);

    if (
        !parsed.prompt ||
        !parsed.prompt.trim()
    ) {

        console.log(
            "FAILED QUESTION"
        );

        console.log(
            question.questionNumber
        );

        console.log(
            question.content
        );

        console.log(
            parsed
        );

        throw new Error(
            `Question ${question.questionNumber} was not parsed correctly.`
        );

    }

    return parsed;

}