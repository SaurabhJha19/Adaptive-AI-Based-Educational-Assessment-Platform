import { PdfLine } from "./pdf-page";

export interface PdfBlock {

    page: number;

    type:

        | "paragraph"

        | "heading"

        | "table"

        | "equation"

        | "image"

        | "graph";

    lines: PdfLine[];

}