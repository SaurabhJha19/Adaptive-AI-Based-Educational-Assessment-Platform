import openai from "../../../../../config/openai";
import { repairJson } from "../../core/repair/repair-json";
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

const repaired = repairJson(content);

let parsed: any;

try {

    parsed = JSON.parse(repaired);

} catch (error) {

    console.error("========== INVALID JSON ==========");
    console.error(repaired);
    console.error("==================================");

    throw error;

}

console.log("");
console.log("========== LLM SAMPLE ==========");
console.log(
    JSON.stringify(
        parsed.sections?.[0]?.questionGroups?.[0]?.questions?.slice(0, 5),
        null,
        2
    )
);
console.log("================================");
console.log("");

return parsed;

console.log("");
console.log("========== LLM SAMPLE ==========");
console.log(
    JSON.stringify(
        parsed.sections?.[0]?.questionGroups?.[0]?.questions?.slice(0, 5),
        null,
        2
    )
);
console.log("================================");
console.log("");

return parsed;

}