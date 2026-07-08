import { ContentBlock } from "./content-block";

export interface GraphBlock
extends ContentBlock {

    type: "graph";

    data: {

        imageUrl?: string;

        caption?: string;

        alt?: string;

    };

}