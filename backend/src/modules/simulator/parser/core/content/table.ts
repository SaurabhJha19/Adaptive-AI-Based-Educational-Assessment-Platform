import { ContentBlock } from "./content-block";

export interface TableBlock
extends ContentBlock {

    type: "table";

    data: {

        headers: string[];

        rows: string[][];

    };

}