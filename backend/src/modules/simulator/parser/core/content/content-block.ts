export type ContentBlockType =
    | "paragraph"
    | "heading"
    | "subheading"
    | "instruction"
    | "equation"
    | "table"
    | "graph"
    | "image"
    | "list";

export interface ContentBlock {

    type: ContentBlockType;

    data: Record<string, any>;

}