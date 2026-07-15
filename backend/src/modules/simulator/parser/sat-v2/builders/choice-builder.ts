import { randomUUID } from "crypto";

import {

    ExamChoice

} from "../../core/exam-definition";

import {

    ChoiceRegion

} from "../detectors/choice-detector";

export class ChoiceBuilder {

    build(
        region: ChoiceRegion
    ): ExamChoice[] {

        const choices: ExamChoice[] = [];

        let current:
            ExamChoice | null = null;

        for (const block of region.blocks) {

            if (
                block.type ===
                "choice"
            ) {

                if (current) {

                    choices.push(
                        current
                    );

                }

                const label =
                    block.text
                        .trim()
                        .charAt(0) as
                    "A" | "B" | "C" | "D";

                current = {

                    id: randomUUID(),

                    label,

                    text:
                        block.text.replace(
                            /^[A-D][.)]\s*/,
                            ""
                        )

                };

                continue;

            }

            if (!current) {
                continue;
            }

            current.text +=
                "\n" +
                block.text;

        }

        if (current) {

            choices.push(
                current
            );

        }

        return choices;

    }

}