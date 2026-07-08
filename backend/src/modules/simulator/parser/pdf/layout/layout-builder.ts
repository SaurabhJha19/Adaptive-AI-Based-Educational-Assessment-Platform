import { PdfPage } from "../pdf-page";

import {

    LayoutLine,

    LayoutParagraph,

    LayoutBlock,

} from "./layout-types";

export function
buildLayout(

    pages: PdfPage[]

): LayoutBlock[] {

    const blocks:
        LayoutBlock[] = [];

    for (
        const page of pages
    ) {

        let current:
            LayoutParagraph = {

                page:
                    page.page,

                lines: [],

            };

        for (

            let i = 0;

            i < page.lines.length;

            i++

        ) {

            const line =
                page.lines[i];

            current.lines.push({

                page:
                    page.page,

                y:
                    line.y,

                items:
                    line.words,

            });

            const next =
                page.lines[
                    i + 1
                ];

            if (!next) {

                blocks.push({

                    page:
                        page.page,

                    type:
                        "paragraph",

                    paragraphs:
                        [current],

                });

                continue;

            }

            if (

                Math.abs(
                    next.y -
                    line.y
                ) > 18

            ) {

                blocks.push({

                    page:
                        page.page,

                    type:
                        "paragraph",

                    paragraphs:
                        [current],

                });

                current = {

                    page:
                        page.page,

                    lines: [],

                };

            }

        }

    }

    return blocks;

}