import { ContentBlock } from "./content-block";

export interface ImageBlock
extends ContentBlock {

    type: "image";

    data: {

        imageUrl?: string;

        caption?: string;

        alt?: string;

    };

}