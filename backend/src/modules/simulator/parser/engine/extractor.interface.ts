import { ParsedDocument } from "./document";

export interface DocumentExtractor {

    extract(

        pdf: Buffer

    ): Promise<ParsedDocument>;

}