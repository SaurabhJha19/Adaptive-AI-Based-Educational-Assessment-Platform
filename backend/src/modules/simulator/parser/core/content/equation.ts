import { ContentBlock } from "./content-block";

export interface EquationBlock
extends ContentBlock {

    type: "equation";

    data: {

        latex: string;

        displayMode: boolean;

    };

}