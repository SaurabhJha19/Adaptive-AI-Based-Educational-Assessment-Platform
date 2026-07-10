"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

interface Props {

    left: React.ReactNode;

    right: React.ReactNode;

    defaultWidth?: number;

}

export default function SplitPane({

    left,

    right,

    defaultWidth = 45,

}: Props) {

    const [

        width,

        setWidth,

    ] = useState(defaultWidth);

    const dragging =
        useRef(false);

    const startDrag = () => {

        dragging.current = true;

    };

    const stopDrag = () => {

        dragging.current = false;

    };

    const onMove =
        useCallback(

            (event: MouseEvent) => {

                if (!dragging.current) {

                    return;

                }

                const next =

                    (event.clientX /

                        window.innerWidth) *

                    100;

                setWidth(

                    Math.min(

                        70,

                        Math.max(

                            30,

                            next

                        )

                    )

                );

            },

            []

        );

    useEffect(() => {

        window.addEventListener(

            "mousemove",

            onMove

        );

        window.addEventListener(

            "mouseup",

            stopDrag

        );

        return () => {

            window.removeEventListener(

                "mousemove",

                onMove

            );

            window.removeEventListener(

                "mouseup",

                stopDrag

            );

        };

    }, [onMove]);

    return (

        <div className="flex h-full">

            <div

                style={{

                    width: `${width}%`,

                }}

                className="overflow-hidden border-r bg-white"

            >

                {left}

            </div>

            <div

                onMouseDown={startDrag}

                className="w-1 cursor-col-resize bg-gray-200 transition-colors hover:bg-blue-500"

            />

            <div className="flex-1 overflow-hidden bg-white">

                {right}

            </div>

        </div>

    );

}