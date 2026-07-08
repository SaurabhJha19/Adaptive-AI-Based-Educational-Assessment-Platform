import { ContentBlock } from "./content-block";

export interface ParagraphBlock
extends ContentBlock {

    type: "paragraph";

    data: {

        text: string;

    };

}