import { ParsedDocument } from "../engine";

export interface ParserChunk {

    moduleTitle: string;

    moduleIndex: number;

    chunkIndex: number;

    totalChunks: number;

    startPage: number;

    endPage: number;

    content: string;

    pages: ParsedDocument["pages"];

}

export function chunkModule(
    module: any,
    pagesPerChunk = 3
): ParserChunk[] {

    const chunks: ParserChunk[] = [];

    const pages = module.pages;

    for (

        let i = 0;

        i < pages.length;

        i += pagesPerChunk

    ) {

        const slice =
            pages.slice(
                i,
                i + pagesPerChunk
            );

        const content =
            slice

                .flatMap(

                    (page: any) =>

                        page.blocks

                )

                .map(

                    (block: any) =>

                        block.text

                )

                .join("\n\n");

        chunks.push({

            moduleTitle:
                module.title,

            moduleIndex:
                module.order,

            chunkIndex:
                chunks.length + 1,

            totalChunks:
                Math.ceil(
                    pages.length /
                    pagesPerChunk
                ),

            startPage:
                slice[0].page,

            endPage:
                slice[
                    slice.length - 1
                ].page,

            content,

            pages: slice,

        });

    }

    return chunks;

}