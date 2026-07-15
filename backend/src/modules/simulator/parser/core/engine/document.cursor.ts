import {

    AnyBlock,
    ParsedDocument,

} from "../../../document/core";

export class DocumentCursor {

    private readonly blocks: AnyBlock[] = [];

    private index = 0;

    constructor(
        document: ParsedDocument
    ) {

        for (

            const page

            of document.pages

        ) {

            this.blocks.push(

                ...page.blocks

            );

        }

    }

    current() {

        return this.blocks[
            this.index
        ];

    }

    next() {

        this.index++;

    }

    peek(
        offset = 1
    ) {

        return this.blocks[
            this.index + offset
        ];

    }

    eof() {

        return this.index >=
            this.blocks.length;

    }

    position() {

        return this.index;

    }

}