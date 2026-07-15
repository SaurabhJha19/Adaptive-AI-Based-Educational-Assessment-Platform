import { LayoutDocument } from "../layout";

export interface QuestionAnchor {

    number: number;

    page: number;

    column: number;

    order: number;

}

export class QuestionDetector {

    detect(
        layout: LayoutDocument
    ): QuestionAnchor[] {

        const anchors: QuestionAnchor[] = [];

        for (const page of layout.pages) {

            for (const column of page.columns) {

                for (const block of column.blocks) {

                    if (
                        block.type !==
                        "question_number"
                    ) {
                        continue;
                    }

                    const number =
                        Number(
                            block.text.trim()
                        );

                    if (
                        Number.isNaN(
                            number
                        )
                    ) {
                        continue;
                    }

                    anchors.push({

                        number,

                        page:
                            block.page,

                        column:
                            block.column,

                        order:
                            block.order

                    });

                }

            }

        }

        anchors.sort(

            (a, b) => {

                if (
                    a.page !==
                    b.page
                ) {

                    return (
                        a.page -
                        b.page
                    );

                }

                if (
                    a.column !==
                    b.column
                ) {

                    return (
                        a.column -
                        b.column
                    );

                }

                return (
                    a.order -
                    b.order
                );

            }

        );

        return this.removeDuplicates(
            anchors
        );

    }

    private removeDuplicates(
        anchors: QuestionAnchor[]
    ): QuestionAnchor[] {

        const seen =
            new Set<string>();

        const result:
            QuestionAnchor[] = [];

        for (const anchor of anchors) {

            const key =
                `${anchor.page}-${anchor.column}-${anchor.number}`;

            if (
                seen.has(key)
            ) {
                continue;
            }

            seen.add(key);

            result.push(anchor);

        }

        return result;

    }

}