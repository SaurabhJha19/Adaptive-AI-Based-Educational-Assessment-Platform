import { ParsedDocument } from "./document.interfaces";
import { BlockType } from "./document.types";
import { LayoutSorter } from "../utils/layout-sorter";

export interface DocumentStatistics {

    pages: number;

    blocks: number;

    textBlocks: number;

    sectionHeaders: number;

    listItems: number;

    figures: number;

    tables: number;

    formulas: number;

    pageHeaders: number;

    pageFooters: number;

}

export function buildStatistics(
    document: ParsedDocument
): DocumentStatistics {

    const stats: DocumentStatistics = {

        pages: document.metadata.pageCount,

        blocks: 0,

        textBlocks: 0,

        sectionHeaders: 0,

        listItems: 0,

        figures: 0,

        tables: 0,

        formulas: 0,

        pageHeaders: 0,

        pageFooters: 0,

    };

    for (const page of document.pages) {

        stats.blocks += page.blocks.length;

        const ordered =

    LayoutSorter.sort(
        page.blocks
    );

for (const block of ordered) {

            switch (block.type) {

                case BlockType.TEXT:
                    stats.textBlocks++;
                    break;

                case BlockType.SECTION_HEADER:
                    stats.sectionHeaders++;
                    break;

                case BlockType.LIST_ITEM:
                    stats.listItems++;
                    break;

                case BlockType.TABLE:
                    stats.tables++;
                    break;

                case BlockType.FIGURE:
                    stats.figures++;
                    break;

                case BlockType.FORMULA:
                    stats.formulas++;
                    break;

                case BlockType.PAGE_HEADER:
                    stats.pageHeaders++;
                    break;

                case BlockType.PAGE_FOOTER:
                    stats.pageFooters++;
                    break;

            }

        }

    }

    return stats;

}