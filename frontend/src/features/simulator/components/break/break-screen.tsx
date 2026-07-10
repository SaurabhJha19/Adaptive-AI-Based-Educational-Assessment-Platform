"use client";

import { SimulatorButton } from "../ui";

interface Props {

    duration: number;

    onSkip: () => void;

}

export default function BreakScreen({

    duration,

    onSkip,

}: Props) {

    const minutes =
        Math.floor(duration / 60);

    const seconds =
        duration % 60;

    return (

        <div className="flex h-screen items-center justify-center bg-background">

            <div className="w-full max-w-2xl rounded-2xl border bg-white p-12 shadow-sm">

                <div className="text-center">

                    <h1 className="text-4xl font-bold">

                        Break Time

                    </h1>

                    <p className="mt-4 text-lg text-gray-500">

                        Take a short break before the next module.

                    </p>

                    <div className="mt-10 font-mono text-6xl font-bold">

                        {`${minutes}:${seconds

                            .toString()

                            .padStart(2, "0")}`}

                    </div>

                </div>

                <div className="mt-12 flex justify-center">

                    <SimulatorButton

                        variantType="primary"

                        onClick={onSkip}

                    >

                        Continue Now

                    </SimulatorButton>

                </div>

            </div>

        </div>

    );

}