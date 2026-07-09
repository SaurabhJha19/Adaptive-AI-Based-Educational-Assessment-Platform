"use client";

import {

    InlineMath,

} from "react-katex";

interface Props {

    latex: string;

}

export default function InlineEquationRenderer({

    latex,

}: Props) {

    return (

        <InlineMath

            math={latex}

        />

    );

}