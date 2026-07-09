"use client";

import {

    useCallback,

    useState,

} from "react";

export default function useSplitPane(

    initial = 50

) {

    const [

        width,

        setWidth,

    ] = useState(initial);

    const onDrag =

        useCallback(

            (

                percent: number

            ) => {

                const next =

                    Math.max(

                        20,

                        Math.min(

                            80,

                            percent

                        )

                    );

                setWidth(

                    next

                );

            },

            []

        );

    return {

        width,

        onDrag,

    };

}