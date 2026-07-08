import { ContentBlock } from "./content-block";

export interface ListBlock
extends ContentBlock {

    type: "list";

    data: {

        ordered: boolean;

        items: string[];

    };

}