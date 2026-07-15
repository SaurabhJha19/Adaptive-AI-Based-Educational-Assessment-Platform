export type LayoutBlockType =
    | "text"
    | "question_number"
    | "choice"
    | "passage"
    | "table"
    | "image"
    | "graph"
    | "formula"
    | "header"
    | "footer"
    | "unknown";

export interface BoundingBox {

    left: number;

    top: number;

    right: number;

    bottom: number;

}

export interface LayoutBlock {

    id: string;

    page: number;

    type: LayoutBlockType;

    text: string;

    bbox: BoundingBox;

    column: number;

    order: number;

}