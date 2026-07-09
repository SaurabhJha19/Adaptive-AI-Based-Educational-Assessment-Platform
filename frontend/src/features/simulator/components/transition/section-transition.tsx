"use client";

import {

    TransitionHeader,

    TransitionSummary,

    TransitionActions,

} from ".";

interface Props {

    current: number;

    total: number;

    onContinue: () => void;

}

export default function SectionTransition({

    current,

    total,

    onContinue,

}: Props) {

    return (

        <div className="mx-auto flex h-full max-w-3xl flex-col justify-center gap-10">

            <TransitionHeader

                current={current}

                total={total}

            />

            <TransitionSummary />

            <TransitionActions

                onContinue={onContinue}

            />

        </div>

    );

}