import {

    BlockType,

} from "../../../document/core";

import {

    createEvent,
    ParserEventType,

} from "../../core/events";

import {

    DocumentCursor,
    MatchResult,
    NO_MATCH,
    ParserContext,
    ParserRule,
    match,

} from "../../core/engine";

export class SATSectionRule
implements ParserRule {

    readonly name =
        "SATSection";

    evaluate(

        cursor: DocumentCursor,

        context: ParserContext

    ): MatchResult {

        const block =
            cursor.current();

        if (!block)
            return NO_MATCH;

        if (

            block.type !==
            BlockType.SECTION_HEADER

        ) {

            return NO_MATCH;

        }

        const text =
            block.text
                .trim();

        if (

            /reading\s+and\s+writing/i.test(
                text
            )

        ) {

            return match(

                1,

                1,

                [

                    createEvent(

                        ParserEventType.SECTION_START,

                        block.page,

                        1,

                        {

                            title:
                                "Reading & Writing",

                        },

                        [

                            block,

                        ]

                    ),

                ]

            );

        }

        if (

            /^math$/i.test(
                text
            )

        ) {

            return match(

                1,

                1,

                [

                    createEvent(

                        ParserEventType.SECTION_START,

                        block.page,

                        1,

                        {

                            title:
                                "Math",

                        },

                        [

                            block,

                        ]

                    ),

                ]

            );

        }

        return NO_MATCH;

    }

}