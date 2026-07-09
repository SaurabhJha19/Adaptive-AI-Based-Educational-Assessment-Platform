import RichSpan from "./RichSpan";

import {

    RichSpan as Span,

} from "./types";

interface Props {

    spans: Span[];

}

export default function RichText({

    spans,

}: Props) {

    return (

        <>

            {spans.map(

                (

                    span,

                    index

                ) => (

                    <RichSpan

                        key={index}

                        span={span}

                    />

                )

            )}

        </>

    );

}