import openai from "../../../../../config/openai";

import { ParserChunk } from "../../core/chunk-module";
import { buildContext } from "../../core/build-context";

export async function llmExtract(
    chunk: ParserChunk,
    extractedQuestions: number
) {

    const context =
        buildContext(
            chunk,
            extractedQuestions
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
                    content: context.system,
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
            "Empty LLM response."
        );

    }

    return JSON.parse(
        content
    );

}