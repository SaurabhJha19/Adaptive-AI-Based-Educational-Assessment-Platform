"use client";

import { SimulatorButton } from "../ui";

interface Props {

    sectionIndex: number;

    totalSections: number;

    onContinue: () => void;

}

export default function SectionTransition({

    sectionIndex,

    totalSections,

    onContinue,

}: Props) {

    const finalSection =

        sectionIndex ===

        totalSections - 1;

    return (

        <div className="flex h-screen items-center justify-center bg-background">

            <div className="w-full max-w-3xl rounded-2xl border bg-white p-12 shadow-sm">

                <div className="mb-10 text-center">

                    <h1 className="text-4xl font-bold">

                        Module Complete

                    </h1>

                    <p className="mt-4 text-lg text-gray-500">

                        {

                            finalSection

                                ?

                                "You have completed the final module."

                                :

                                "You have completed this module."

                        }

                    </p>

                </div>

                <div className="grid grid-cols-2 gap-6">

                    <div className="rounded-xl border p-6">

                        <div className="text-sm text-gray-500">

                            Completed

                        </div>

                        <div className="mt-3 text-3xl font-bold">

                            {sectionIndex + 1}

                        </div>

                    </div>

                    <div className="rounded-xl border p-6">

                        <div className="text-sm text-gray-500">

                            Remaining

                        </div>

                        <div className="mt-3 text-3xl font-bold">

                            {

                                Math.max(

                                    totalSections -

                                    sectionIndex -

                                    1,

                                    0

                                )

                            }

                        </div>

                    </div>

                </div>

                <div className="mt-10 flex justify-end">

                    <SimulatorButton

                        variantType="primary"

                        onClick={onContinue}

                    >

                        {

                            finalSection

                                ?

                                "Finish Exam"

                                :

                                "Start Next Module"

                        }

                    </SimulatorButton>

                </div>

            </div>

        </div>

    );

}