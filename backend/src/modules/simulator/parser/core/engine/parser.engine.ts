import {

    DocumentCursor,

} from "./document.cursor";

import {

    ParserContext,

} from "./parser.context";

import {

    ParserRule,

} from "./parser.rule";

import {

    MatchResult,

} from "./match-result";

export class ParserEngine {

    constructor(

        private readonly rules: ParserRule[]

    ) {}

    execute(

        cursor: DocumentCursor,

        context: ParserContext

    ) {

        while (

            !cursor.eof()

        ) {

            let winner:

                | {

                      rule: ParserRule;

                      result: MatchResult;

                  }

                | null = null;

            for (

                const rule

                of this.rules

            ) {

                const result =

                    rule.evaluate(

                        cursor,

                        context

                    );

                if (

                    !result.matched

                ) {

                    continue;

                }

                if (

                    !winner ||

                    result.confidence >

                        winner.result.confidence

                ) {

                    winner = {

                        rule,

                        result,

                    };

                }

            }

            if (

                !winner

            ) {

                cursor.next();

                continue;

            }

            for (

                const event

                of winner.result.events

            ) {

                context.events.emit(
                    event
                );

            }

            for (

                let i = 0;

                i <

                Math.max(

                    1,

                    winner.result.consumed

                );

                i++

            ) {

                cursor.next();

            }

        }

    }

}