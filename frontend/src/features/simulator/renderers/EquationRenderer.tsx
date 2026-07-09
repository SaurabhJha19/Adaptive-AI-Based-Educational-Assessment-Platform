"use client";

import {

    BlockMath,

    InlineMath,

} from "react-katex";

interface Props {

    latex: string;

    displayMode?: boolean;

}

export default function EquationRenderer({

    latex,

    displayMode = true,

}: Props) {

    if (!latex?.trim()) {

        return null;

    }

    return displayMode ? (

        <div className="my-6 overflow-x-auto">

            <BlockMath

                math={latex}

                errorColor="#dc2626"

            />

        </div>

    ) : (

        <InlineMath

            math={latex}

            errorColor="#dc2626"

        />

    );

}