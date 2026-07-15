import { LayoutBlock, LayoutDocument } from "../layout";

export interface ChoiceRegion {

    question: number;

    page: number;

    column: number;

    blocks: LayoutBlock[];

}

export class ChoiceDetector {

    detect(
        layout: LayoutDocument
    ): ChoiceRegion[] {

        const regions: ChoiceRegion[] = [];

        let current: ChoiceRegion | null = null;

        const blocks =
            layout.pages.flatMap(page =>
                page.columns.flatMap(
                    column => column.blocks
                )
            );

        for (const block of blocks) {

            if (
                block.type ===
                "question_number"
            ) {

                if (current) {

                    regions.push(
                        current
                    );

                }

                current = {

                    question: Number(
                        block.text
                    ),

                    page:
                        block.page,

                    column:
                        block.column,

                    blocks: []

                };

                continue;

            }

            if (!current) {
                continue;
            }

            if (

                block.type === "choice" ||

                block.type === "formula" ||

                block.type === "image" ||

                block.type === "graph" ||

                block.type === "table" ||

                block.type === "text"

            ) {

                current.blocks.push(
                    block
                );

            }

        }

        if (current) {

            regions.push(
                current
            );

        }

        return regions;

    }

}