import { DocumentBlock } from "./block";

export interface DocumentPage {

    page: number;

    width: number;

    height: number;

    blocks: DocumentBlock[];

}