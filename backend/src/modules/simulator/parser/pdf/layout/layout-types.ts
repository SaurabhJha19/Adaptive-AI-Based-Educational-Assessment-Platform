import { PdfTextItem } from "../pdf-item";

export interface LayoutLine {

    page: number;

    y: number;

    items: PdfTextItem[];

}

export interface LayoutParagraph {

    page: number;

    lines: LayoutLine[];

}

export interface LayoutBlock {

    page: number;

    type:

        | "heading"

        | "paragraph"

        | "table"

        | "equation"

        | "list"

        | "graph"

        | "image"

        | "question"

        | "choices";

    paragraphs: LayoutParagraph[];

}