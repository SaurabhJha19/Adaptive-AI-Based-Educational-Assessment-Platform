import {
    DocumentPage,
} from "./document.interfaces";

export class PageBuilder {

    private readonly pages =
        new Map<number, DocumentPage>();

    constructor(
        totalPages: number
    ) {

        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            this.pages.set(

                page,

                {

                    pageNumber: page,

                    isBlank: true,

                    blocks: [],

                }

            );

        }

    }

    getPage(
        pageNumber: number
    ): DocumentPage {

        const page =
            this.pages.get(
                pageNumber
            );

        if (!page) {

            throw new Error(

                `Unknown page ${pageNumber}`

            );

        }

        return page;

    }

    addBlock(
        pageNumber: number,
        block: any
    ) {

        const page =
            this.getPage(
                pageNumber
            );

        page.blocks.push(
            block
        );

        page.isBlank = false;

    }

    build() {

        return Array

            .from(
                this.pages.values()
            )

            .sort(

                (a, b) =>

                    a.pageNumber -

                    b.pageNumber

            );

    }

}