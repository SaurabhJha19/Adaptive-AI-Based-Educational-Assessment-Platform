import { AnyBlock } from "../../../document/core";

import { ParserEvent } from "./parser-event.interface";

import { ParserEventType } from "./parser-event.types";

export function createEvent(

    type: ParserEventType,

    page: number,

    confidence: number,

    payload: Record<string, unknown> = {},

    blocks: AnyBlock[] = []

): ParserEvent {

    return {

        type,

        page,

        confidence,

        payload,

        blocks,

    };

}