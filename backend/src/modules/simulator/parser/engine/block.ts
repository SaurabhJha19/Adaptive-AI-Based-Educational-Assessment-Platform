export interface DocumentBlock {

    id: string;

    type:

        | "paragraph"

        | "heading"

        | "table"

        | "equation"

        | "image"

        | "graph"

        | "list";

    text: string;

    page: number;

    x: number;

    y: number;

    width: number;

    height: number;

    metadata:
        Record<string, any>;

}