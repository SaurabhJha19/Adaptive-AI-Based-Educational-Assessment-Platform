"use client";

import { useEffect, useState } from "react";

interface Props {

    initialTime: number;

    onExpire: () => void;

}

export default function useExamTimer({

    initialTime,

    onExpire,

}: Props) {

    const [

        remainingTime,

        setRemainingTime,

    ] = useState(initialTime);

    useEffect(() => {

        if (remainingTime <= 0) {

            onExpire();

            return;

        }

        const timer = window.setInterval(() => {

            setRemainingTime(

                previous => previous - 1

            );

        }, 1000);

        return () =>

            window.clearInterval(timer);

    }, [

        remainingTime,

        onExpire,

    ]);

    return {

        remainingTime,

        setRemainingTime,

    };

}