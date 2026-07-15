import { LayoutDocument } from "../layout";

import {

    CHOICE,

    FOOTER,

    HEADER,

    MATH,

    MODULE,

    PASSAGE,

    QUESTION_NUMBER,

    QUESTION_PROMPT,

    READING,

    STOP

} from "./classification-rules";

export class BlockClassifier {

    classify(
        layout: LayoutDocument
    ): LayoutDocument {

        for (const page of layout.pages) {

            for (const column of page.columns) {

                for (const block of column.blocks) {

                    const text =
                        block.text
                            .trim();

                    if (!text) {
                        continue;
                    }

                    if (
                        QUESTION_NUMBER.test(text)
                    ) {

                        block.type =
                            "question_number";

                        continue;

                    }

                    if (
                        CHOICE.test(text)
                    ) {

                        block.type =
                            "choice";

                        continue;

                    }

                    if (
                        QUESTION_PROMPT.test(text)
                    ) {

                        block.type =
                            "passage";

                        continue;

                    }

                    if (
                        PASSAGE.test(text)
                    ) {

                        block.type =
                            "passage";

                        continue;

                    }

                    if (
                        MODULE.test(text)
                    ) {

                        block.type =
                            "header";

                        continue;

                    }

                    if (
                        HEADER.test(text)
                    ) {

                        block.type =
                            "header";

                        continue;

                    }

                    if (
                        FOOTER.test(text)
                    ) {

                        block.type =
                            "footer";

                        continue;

                    }

                    if (
                        READING.test(text)
                    ) {

                        block.type =
                            "header";

                        continue;

                    }

                    if (
                        MATH.test(text)
                    ) {

                        block.type =
                            "header";

                        continue;

                    }

                    if (
                        STOP.test(text)
                    ) {

                        block.type =
                            "header";

                        continue;

                    }

                    if (
                        /[=√πΣ∫≤≥]/u.test(text)
                    ) {

                        block.type =
                            "formula";

                        continue;

                    }

                    block.type =
                        "text";

                }

            }

        }

        return layout;

    }

}