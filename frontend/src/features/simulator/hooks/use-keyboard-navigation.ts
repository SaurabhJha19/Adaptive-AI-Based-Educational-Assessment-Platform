"use client";

import { useEffect } from "react";

interface Props {

    onPrevious: () => void;

    onNext: () => void;

    onMarkReview: () => void;

}

export default function useKeyboardNavigation({

    onPrevious,

    onNext,

    onMarkReview,

}: Props) {

    useEffect(() => {

        function handleKeyDown(
            event: KeyboardEvent
        ) {

            switch (event.key) {

                case "ArrowLeft":

                    event.preventDefault();

                    onPrevious();

                    break;

                case "ArrowRight":

                    event.preventDefault();

                    onNext();

                    break;

                case "m":

                case "M":

                    event.preventDefault();

                    onMarkReview();

                    break;

            }

        }

        window.addEventListener(

            "keydown",

            handleKeyDown

        );

        return () =>

            window.removeEventListener(

                "keydown",

                handleKeyDown

            );

    }, [

        onPrevious,

        onNext,

        onMarkReview,

    ]);

}