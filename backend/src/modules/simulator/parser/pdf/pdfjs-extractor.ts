import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { PdfTextItem } from "./pdf-item";

import {
    PdfPage,
    PdfWord,
    PdfLine,
} from "./pdf-page";

function sortWords(
    words: PdfWord[]
) {

    return words.sort(

        (a, b) => {

            if (

                Math.abs(
                    a.y - b.y
                ) > 2

            ) {

                return a.y - b.y;

            }

            return a.x - b.x;

        }

    );

}

function groupLines(
    words: PdfWord[]
): PdfLine[] {

    const sorted =
        sortWords(words);

    const lines: PdfLine[] =
        [];

    for (
        const word of sorted
    ) {

        const line =
            lines.find(

                l =>

                    Math.abs(
                        l.y - word.y
                    ) < 3

            );

        if (line) {

            line.words.push(
                word
            );

        }

        else {

            lines.push({

                y: word.y,

                words: [word],

            });

        }

    }

    for (
        const line of lines
    ) {

        line.words.sort(

            (a, b) =>

                a.x - b.x

        );

    }

    return lines;

}

export async function
extractPdfPages(

    buffer: Buffer

): Promise<PdfPage[]> {

    const loadingTask =
        pdfjsLib.getDocument({

            data:
                new Uint8Array(
                    buffer
                ),

        });

    const pdf =
        await loadingTask.promise;

    const pages:
        PdfPage[] = [];

    for (

        let pageNumber = 1;

        pageNumber <= pdf.numPages;

        pageNumber++

    ) {

        const page =
            await pdf.getPage(
                pageNumber
            );

        const viewport =
            page.getViewport({

                scale: 1,

            });

        const text =
            await page.getTextContent();

        const items: PdfTextItem[] = [];

        for (const item of text.items as any[]) {

    if (!("str" in item)) {

        continue;

    }

    const transform =
        item.transform as number[];

    const x =
        transform[4];

    const y =
        transform[5];

    const fontSize =
        Math.abs(
            transform[0]
        );

    items.push({

        text:
            item.str,

        x,

        y,

        width:
            item.width,

        height:
            item.height,

        fontSize,

        fontName:
            item.fontName ?? "",

        page:
            pageNumber,

        transform,

    });

}

        pages.push({

            page: pageNumber,

            width:
                viewport.width,

            height:
                viewport.height,

            lines:
                groupLines(
                    items
                ),

        });

    }

    return pages;

}