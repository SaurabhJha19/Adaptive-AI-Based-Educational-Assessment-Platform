import {

    ParsedDocument,

} from "../../../document/core";

import {

    EventBus,

} from "../../core/events";

import {

    GraphBuilder,

} from "../../core/graph";

import {

    DocumentCursor,

    ParserEngine,

} from "../../core/engine";

import {

    SATSectionRule,

} from "../rules";

export class SATBuilder {

    build(
        document: ParsedDocument
    ) {

        const bus =
            new EventBus();

        const engine =
            new ParserEngine([

                new SATSectionRule(),

            ]);

        engine.execute(

            new DocumentCursor(
                document
            ),

            {

                document,

                events: bus,

            }

        );

        return new GraphBuilder()

            .build(bus);

    }

}