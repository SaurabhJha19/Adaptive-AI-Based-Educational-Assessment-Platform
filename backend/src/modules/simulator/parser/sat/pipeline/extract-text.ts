import pdf from "pdf-parse";

import { ParsedPage } from "../types/sat-parser.types";

export async function extractText(
    pdfBuffer: Buffer
): Promise<ParsedPage[]> {

    const pages: ParsedPage[] = [];

    const options = {

        pagerender: async (pageData: any) => {

            const textContent =
                await pageData.getTextContent();

            const text =
                textContent.items
                    .map(
                        (item: any) =>
                            item.str
                    )
                    .join(" ");

            pages.push({

                page: pages.length + 1,

                content: text,

            });

            return text;

        },

    };

    await pdf(
        pdfBuffer,
        options
    );

    return pages;

}