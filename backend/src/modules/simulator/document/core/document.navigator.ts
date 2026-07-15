import {
    AnyBlock,
    ParsedDocument,
} from "./document.interfaces";

export class DocumentNavigator {

    constructor(
        private readonly document: ParsedDocument
    ) {}

    getPage(
        page: number
    ) {

        return this.document.pages.find(

            p => p.pageNumber === page

        );

    }

    getBlocksOnPage(
        page: number
    ): AnyBlock[] {

        return (

            this.getPage(page)?.blocks ??

            []

        );

    }

    getAllBlocks(): AnyBlock[] {

        return this.document.pages.flatMap(

            page => page.blocks

        );

    }

}