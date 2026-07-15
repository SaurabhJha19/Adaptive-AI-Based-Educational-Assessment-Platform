import { LayoutBlock, LayoutDocument } from "../layout";

export interface PassageRegion {

    question: number;

    instruction: string;

    passage: string;

    prompt: string;

    blocks: LayoutBlock[];

}

export class PassageDetector {

    detect(
        layout: LayoutDocument
    ): PassageRegion[] {

        const regions: PassageRegion[] = [];

        let current: PassageRegion | null = null;

        const blocks =
            layout.pages.flatMap(page =>
                page.columns.flatMap(
                    column => column.blocks
                )
            );

        for (const block of blocks) {

            switch (block.type) {

                case "question_number":

                    if (current) {

                        regions.push(current);

                    }

                    current = {

                        question: Number(block.text),

                        instruction: "",

                        passage: "",

                        prompt: "",

                        blocks: []

                    };

                    break;

                case "passage":

                    if (!current) {
                        break;
                    }

                    current.blocks.push(block);

                    if (

                        /^which choice/i.test(
                            block.text
                        )

                    ) {

                        current.prompt +=
                            block.text + "\n";

                    } else {

                        current.passage +=
                            block.text + "\n";

                    }

                    break;

                case "text":

                    if (!current) {
                        break;
                    }

                    current.blocks.push(block);

                    current.prompt +=
                        block.text + "\n";

                    break;

            }

        }

        if (current) {

            regions.push(current);

        }

        return regions;

    }

}