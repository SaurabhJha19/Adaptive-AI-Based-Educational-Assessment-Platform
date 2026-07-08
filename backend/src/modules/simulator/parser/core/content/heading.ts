import { ContentBlock } from "./content-block";

export interface HeadingBlock
extends ContentBlock {

    type: "heading";

    data: {

        text: string;

        level: 1 | 2 | 3;

    };

}