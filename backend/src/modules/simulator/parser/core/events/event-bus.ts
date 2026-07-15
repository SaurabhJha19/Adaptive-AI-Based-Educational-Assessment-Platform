import { ParserEvent } from "./parser-event.interface";

export class EventBus {

    private readonly events: ParserEvent[] = [];

    emit(
        event: ParserEvent
    ) {

        this.events.push(
            event
        );

    }

    getEvents() {

        return this.events;

    }

    clear() {

        this.events.length = 0;

    }

}