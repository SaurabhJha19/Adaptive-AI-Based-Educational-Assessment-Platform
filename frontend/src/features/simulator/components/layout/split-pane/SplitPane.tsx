"use client";

import Divider

from "./Divider";

import useSplitPane

from "./useSplitPane";

import {

    SplitPaneProps,

} from "./types";

export default function SplitPane({

    left,

    right,

    defaultWidth = 50,

}: SplitPaneProps) {

    const {

        width,

        onDrag,

    } = useSplitPane(

        defaultWidth

    );

    return (

        <div className="flex h-full w-full">

            <div

                style={{

                    width:

                        `${width}%`,

                }}

                className="h-full overflow-hidden"

            >

                {left}

            </div>

            <Divider

                onMove={

                    onDrag

                }

            />

            <div

                className="flex-1 h-full overflow-hidden"

            >

                {right}

            </div>

        </div>

    );

}