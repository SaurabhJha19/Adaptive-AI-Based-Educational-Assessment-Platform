"use client";

import {

    useEffect,

    useState,

} from "react";

interface Props {

    initialSeconds: number;

    onExpire?: () => void;

}

export default function Timer({

    initialSeconds,

    onExpire,

}: Props) {

    const [

        seconds,

        setSeconds,

    ] = useState(

        initialSeconds

    );

    useEffect(() => {

        if (seconds <= 0) {

            onExpire?.();

            return;

        }

        const interval =
            setInterval(() => {

                setSeconds(

                    value =>
                        value - 1

                );

            }, 1000);

        return () =>
            clearInterval(interval);

    }, [

        seconds,

        onExpire,

    ]);

    const hours =
        Math.floor(
            seconds / 3600
        );

    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );

    const remaining =
        seconds % 60;

    return (

        <span>

            {String(hours).padStart(2, "0")}

            :

            {String(minutes).padStart(2, "0")}

            :

            {String(remaining).padStart(2, "0")}

        </span>

    );

}