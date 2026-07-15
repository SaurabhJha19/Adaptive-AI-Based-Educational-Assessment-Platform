import {
    AnyBlock,
    ParsedDocument,
} from "../../../document/core";

import {
    LayoutSorter,
} from "../../../document/utils/layout-sorter";

import {
    ModuleBoundary,
} from "./module-boundary.detector";

export interface DetectedQuestion {

    module: ModuleBoundary;

    number: number;

    page: number;

    blocks: AnyBlock[];

}

export class SATQuestionDetector {

    detect(

        document: ParsedDocument,

        modules: ModuleBoundary[]

    ): DetectedQuestion[] {

        const result: DetectedQuestion[] = [];

        for (const module of modules) {

            const moduleBlocks: AnyBlock[] = [];

            for (const page of document.pages) {

                if (
                    page.pageNumber < module.pageStart ||
                    page.pageNumber > module.pageEnd
                ) {
                    continue;
                }

                moduleBlocks.push(

                    ...LayoutSorter.sort(
                        page.blocks
                    )

                );

            }

            let current: DetectedQuestion | null = null;

            for (const block of moduleBlocks) {

                const number =
                    this.extractQuestionNumber(
                        block.text
                    );

                if (number !== null) {

                    if (current) {

                        result.push(current);

                    }

                    current = {

                        module,

                        number,

                        page: block.page,

                        blocks: [block],

                    };

                    continue;

                }

                if (current) {

                    current.blocks.push(block);

                }

            }

            if (current) {

                result.push(current);

            }

        }

        return result;

    }

    private extractQuestionNumber(

        text: string

    ): number | null {

        const trimmed =
            text.trim();

        if (

            !/^(?:[1-9]|[12][0-9]|3[0-3])$/.test(
                trimmed
            )

        ) {

            return null;

        }

        return Number(trimmed);

    }

}