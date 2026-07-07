import { ParsedModule } from "../types";

export function buildSectionFromQuestions(
    module: ParsedModule,
    questions: any[]
) {

    return {

        title: module.title,

        order: module.order,

        questionGroups: [

            {

                title: "",

                order: 1,

                passage: "",

                questions,

            },

        ],

    };

}