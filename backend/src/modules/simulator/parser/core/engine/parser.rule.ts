import {

    DocumentCursor,

} from "./document.cursor";

import {

    MatchResult,

} from "./match-result";

import {

    ParserContext,

} from "./parser.context";

export interface ParserRule {

    readonly name: string;

    evaluate(

        cursor: DocumentCursor,

        context: ParserContext

    ): MatchResult;

}