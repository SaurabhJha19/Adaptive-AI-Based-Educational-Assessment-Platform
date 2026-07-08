import { PdfTextItem } from "../../pdf/pdf-item";
import { DocumentBlock } from "../../engine";
import crypto from "crypto";

export function buildBlocks(
    items: PdfTextItem[],
    page: number
): DocumentBlock[] {

    const blocks: DocumentBlock[] = [];

    const sorted = [...items].sort((a, b) => {

        if (Math.abs(a.y - b.y) > 3) {

            return a.y - b.y;

        }

        return a.x - b.x;

    });

    let currentLine = "";
    let currentItems: PdfTextItem[] = [];
    let currentY: number | null = null;

    for (const item of sorted) {

        if (

            currentY !== null &&

            Math.abs(item.y - currentY) > 4

        ) {

            blocks.push({

                id: crypto.randomUUID(),

                type: "paragraph",

                text: currentLine.trim(),

                page,

                x: currentItems[0].x,

                y: currentItems[0].y,

                width:
                    Math.max(...currentItems.map(i => i.x + i.width)) -
                    currentItems[0].x,

                height:
                    currentItems[0].height,

                metadata: {},

            });

            currentLine = "";
            currentItems = [];

        }

        currentY = item.y;

        currentItems.push(item);

        currentLine += item.text + " ";

    }

    if (currentItems.length) {

        blocks.push({

            id: crypto.randomUUID(),

            type: "paragraph",

            text: currentLine.trim(),

            page,

            x: currentItems[0].x,

            y: currentItems[0].y,

            width:
                Math.max(...currentItems.map(i => i.x + i.width)) -
                currentItems[0].x,

            height:
                currentItems[0].height,

            metadata: {},

        });

    }

    return blocks;

}