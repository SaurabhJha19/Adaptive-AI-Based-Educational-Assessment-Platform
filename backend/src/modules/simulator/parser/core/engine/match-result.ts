import { ParserEvent } from "../events";

export interface MatchResult {

    matched: boolean;

    confidence: number;

    consumed: number;

    events: ParserEvent[];

}

export const NO_MATCH: MatchResult = {

    matched: false,

    confidence: 0,

    consumed: 0,

    events: [],

};

export function match(

    confidence = 1,

    consumed = 1,

    events: ParserEvent[] = []

): MatchResult {

    return {

        matched: true,

        confidence,

        consumed,

        events,

    };

}