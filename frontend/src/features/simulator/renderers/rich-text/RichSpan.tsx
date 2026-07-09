import { RichSpan as Span } from "./types";

interface Props {

    span: Span;

}

export default function RichSpan({

    span,

}: Props) {

    let node =
        <>{span.text}</>;

    if (span.bold) {

        node =
            <strong>{node}</strong>;

    }

    if (span.italic) {

        node =
            <em>{node}</em>;

    }

    if (span.underline) {

        node =
            <u>{node}</u>;

    }

    if (span.superscript) {

        node =
            <sup>{node}</sup>;

    }

    if (span.subscript) {

        node =
            <sub>{node}</sub>;

    }

    if (span.code) {

        node =
            <code>{node}</code>;

    }

    return node;

}