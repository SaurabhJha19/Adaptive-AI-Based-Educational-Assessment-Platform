import { AnyBlock } from "../../../document/core";

import { ParserEventType } from "./parser-event.types";

export interface ParserEvent {

    type: ParserEventType;

    page: number;

    confidence: number;

    payload: Record<string, unknown>;

    blocks: AnyBlock[];

}