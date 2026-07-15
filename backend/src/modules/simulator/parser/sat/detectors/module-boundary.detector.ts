import {
    BlockType,
    ParsedDocument,
} from "../../../document/core";

import { LayoutSorter } from "../../../document/utils/layout-sorter";

export interface ModuleBoundary {

    section: "reading_writing" | "math";

    module: 1 | 2;

    pageStart: number;

    pageEnd: number;

    anchor: string;

}

export class SATModuleBoundaryDetector {

    detect(
        document: ParsedDocument
    ): ModuleBoundary[] {

        const rwHeaders = new Set<number>();
        const mathHeaders = new Set<number>();
        const stopPages = new Set<number>();

        for (const page of document.pages) {

            const ordered =

    LayoutSorter.sort(
        page.blocks
    );

for (const block of ordered) {

                if (block.type !== BlockType.SECTION_HEADER) {
                    continue;
                }

                const text = block.text
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase();

                if (
                    text.includes("reading") &&
                    text.includes("writing")
                ) {

                    rwHeaders.add(page.pageNumber);
                    continue;

                }

                if (text === "math") {

                    mathHeaders.add(page.pageNumber);
                    continue;

                }

                if (text === "stop") {

                    stopPages.add(page.pageNumber);

                }

            }

        }

        const rw = [...rwHeaders].sort(
            (a, b) => a - b
        );

        const math = [...mathHeaders].sort(
            (a, b) => a - b
        );

        const stop = [...stopPages].sort(
            (a, b) => a - b
        );

        if (rw.length !== 2) {

            throw new Error(
                `Expected 2 Reading & Writing headers. Found ${rw.length}.`
            );

        }

        if (math.length !== 2) {

            throw new Error(
                `Expected 2 Math headers. Found ${math.length}.`
            );

        }

        if (stop.length < 4) {

            throw new Error(
                `Expected at least 4 STOP pages. Found ${stop.length}.`
            );

        }

        const mathModule1Start =
            this.findFirstQuestionPage(
                document,
                math[0],
                stop[2]
            );

        return [

            {
                section: "reading_writing",
                module: 1,
                pageStart: rw[0],
                pageEnd: stop[0],
                anchor: "Reading & Writing",
            },

            {
                section: "reading_writing",
                module: 2,
                pageStart: rw[1],
                pageEnd: stop[1],
                anchor: "Reading & Writing",
            },

            {
                section: "math",
                module: 1,
                pageStart: mathModule1Start,
                pageEnd: stop[2],
                anchor: "Math",
            },

            {
                section: "math",
                module: 2,
                pageStart: math[1],
                pageEnd: stop[3],
                anchor: "Math",
            },

        ];

    }

    private findFirstQuestionPage(

        document: ParsedDocument,

        startPage: number,

        endPage: number

    ): number {

        for (

            let page = startPage;

            page <= endPage;

            page++

        ) {

            const current = document.pages.find(

                p => p.pageNumber === page

            );

            if (!current) {
                continue;
            }

            const pageText = current.blocks

                .map(block => block.text)

                .join(" ")

                .toLowerCase();

            // Skip reference/instruction pages

            if (

                pageText.includes("reference") ||

                pageText.includes("directions") ||

                pageText.includes("notes")

            ) {

                continue;

            }

            const hasQuestionNumber =
                current.blocks.some(block => {

                    const text = block.text.trim();

                    return /^(?:[1-9]|[12][0-9]|3[0-3])$/.test(text);

                });

            if (hasQuestionNumber) {

                return page;

            }

        }

        throw new Error(
            "Unable to locate first Math question page."
        );

    }

}