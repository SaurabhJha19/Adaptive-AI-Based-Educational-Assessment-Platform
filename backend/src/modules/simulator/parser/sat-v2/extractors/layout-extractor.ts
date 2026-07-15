import { randomUUID } from "crypto";

import {
    UDMDocument,
    UDMNode
} from "../../../document/universal";

import {
    LayoutBlock,
    LayoutDocument,
    LayoutPage,
    LayoutColumn
} from "../layout";

export class LayoutExtractor {

    extract(
        document: UDMDocument
    ): LayoutDocument {

const pages: LayoutPage[] = [];

for (const page of document.pages) {

    const left: LayoutBlock[] = [];
    const right: LayoutBlock[] = [];

    const pageWidth =
        page.width ?? 612;

    const pageHeight =
        page.height ?? 792;

    const center =
        pageWidth / 2;

    const nodes =
        document.readingOrder.filter(
            node =>
                node.page ===
                page.pageNumber
        );

    let order = 0;

    for (const node of nodes) {

        if (
            !node.bbox
        ) {
            continue;
        }

        const layout: LayoutBlock = {

            id: node.id,

            page:
                page.pageNumber,

            type: "unknown",

            text:
                node.text ?? "",

            bbox: {

                left:
                    node.bbox.x,

                top:
                    node.bbox.y,

                right:
                    node.bbox.x +
                    node.bbox.width,

                bottom:
                    node.bbox.y +
                    node.bbox.height

            },

            column:
                node.bbox.x <
                center
                    ? 0
                    : 1,

            order:
                order++

        };

        if (
            layout.column === 0
        ) {

            left.push(
                layout
            );

        } else {

            right.push(
                layout
            );

        }

    }

    left.sort(
        (a, b) =>
            a.bbox.top -
            b.bbox.top
    );

    right.sort(
        (a, b) =>
            a.bbox.top -
            b.bbox.top
    );

    pages.push({

        pageNumber:
            page.pageNumber,

        width:
            pageWidth,

        height:
            pageHeight,

        columns: [

            {
                index: 0,
                blocks: left
            },

            {
                index: 1,
                blocks: right
            }

        ]

    });

}

return { pages };
    }

}