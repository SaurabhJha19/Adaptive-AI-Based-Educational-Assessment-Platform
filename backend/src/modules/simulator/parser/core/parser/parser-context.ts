import { ParsedDocument } from "../../../document/core";

export interface ParserContext {

    document: ParsedDocument;

    answerKey?: ParsedDocument;

}