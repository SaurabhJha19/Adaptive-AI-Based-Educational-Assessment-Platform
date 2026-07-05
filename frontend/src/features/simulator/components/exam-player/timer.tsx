"use client";

import { useEffect, useState } from "react";

interface Props {
    initialSeconds: number;
}

export default function Timer({
    initialSeconds,
}: Props) {

    const [seconds, setSeconds] =
        useState(initialSeconds);

    useEffect(() => {

        const interval = setInterval(() => {

            setSeconds((prev) => {

                if (prev <= 0) {

                    clearInterval(interval);

                    return 0;
                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(interval);

    }, []);

    const hours =
        Math.floor(seconds / 3600);

    const minutes =
        Math.floor((seconds % 3600) / 60);

    const secs =
        seconds % 60;

    return (

        <div className="rounded-md bg-black px-4 py-2 font-mono text-white">

            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(secs).padStart(2, "0")}

        </div>

    );

}