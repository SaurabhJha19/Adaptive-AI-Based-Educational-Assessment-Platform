import * as pdfjsLib
from "pdfjs-dist/legacy/build/pdf.mjs";

import {

    ParsedDocument,

    DocumentPage,

    DocumentExtractor,

} from "../../engine";

import { PdfTextItem }
from "../../pdf/pdf-item";

import { buildBlocks }
from "./pdfjs-layout";

export class PdfJsExtractor
implements DocumentExtractor {

    async extract(
        pdf: Buffer
    ): Promise<ParsedDocument> {

        const loadingTask =
            pdfjsLib.getDocument({

                data:
                    new Uint8Array(pdf),

            });

        const document =
            await loadingTask.promise;

        const pages:
            DocumentPage[] = [];

        for (

    let pageNumber = 1;

    pageNumber <= document.numPages;

    pageNumber++

) {

    const pdfPage =
        await document.getPage(
            pageNumber
        );

    const viewport =
        pdfPage.getViewport({

            scale: 1,

        });

    const textContent =
        await pdfPage.getTextContent();

    const items: PdfTextItem[] =
        [];

    for (
        const item of textContent.items as any[]
    ) {

        if (
            !("str" in item)
        ) {

            continue;

        }

        const transform =
            item.transform as number[];

        items.push({

            text:
                item.str,

            x:
                transform[4],

            y:
                viewport.height -
                transform[5],

            width:
                item.width,

            height:
                item.height,

            fontSize:
                Math.abs(
                    transform[0]
                ),

            fontName:
                item.fontName ??
                "",

            page:
                pageNumber,

            transform,

        });

    }

    pages.push({

        page:
            pageNumber,

        width:
            viewport.width,

        height:
            viewport.height,

        blocks:
            buildBlocks(
                items,
                pageNumber
            ),

    });

}

        return {

            pageCount:
                document.numPages,

            pages,

        };

    }

}