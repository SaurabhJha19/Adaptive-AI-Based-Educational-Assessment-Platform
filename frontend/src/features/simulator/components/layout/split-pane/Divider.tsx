"use client";

interface Props {

    onMove: (

        percent: number

    ) => void;

}

export default function Divider({

    onMove,

}: Props) {

    function handleMouseDown() {

        function handleMove(

            e: MouseEvent

        ) {

            onMove(

                (

                    e.clientX /

                    window.innerWidth

                ) * 100

            );

        }

        function stop() {

            window.removeEventListener(

                "mousemove",

                handleMove

            );

            window.removeEventListener(

                "mouseup",

                stop

            );

        }

        window.addEventListener(

            "mousemove",

            handleMove

        );

        window.addEventListener(

            "mouseup",

            stop

        );

    }

    return (

        <div

            onMouseDown={

                handleMouseDown

            }

            className="w-1 cursor-col-resize bg-gray-200 hover:bg-gray-400"

        />

    );

}