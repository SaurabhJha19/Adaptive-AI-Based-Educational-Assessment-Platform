import { ParsedDocument } from "../../../document/core";

import { EventBus } from "../events";

export interface ParserContext {

    document: ParsedDocument;

    events: EventBus;

}