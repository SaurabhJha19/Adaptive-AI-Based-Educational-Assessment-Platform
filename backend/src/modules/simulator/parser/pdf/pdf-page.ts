import { PdfTextItem } from "./pdf-item";

export type PdfWord = PdfTextItem;

export interface PdfLine {

    y: number;

    words: PdfWord[];

}

export interface PdfPage {

    page: number;

    width: number;

    height: number;

    lines: PdfLine[];

}