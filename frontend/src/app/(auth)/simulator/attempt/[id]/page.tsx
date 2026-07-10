"use client";

import { useParams } from "next/navigation";

import SimulatorPlayer
from "@/features/simulator/components/simulator-player";

import {
    useSimulatorAttempt,
} from "@/features/simulator/hooks/use-simulator-attempt";

export default function SimulatorAttemptPage() {

    const params =
        useParams();

    const attemptId =
        params.id as string;

    const {

        data,

        isLoading,

        isError,

    } = useSimulatorAttempt(

        attemptId

    );

    if (isLoading) {

        return (

            <div className="flex h-screen items-center justify-center">

                Loading...

            </div>

        );

    }

    if (

        isError ||

        !data

    ) {

        return (

            <div className="flex h-screen items-center justify-center">

                Exam not found

            </div>

        );

    }

    return (

        <SimulatorPlayer

            exam={

                data.exam

            }

            attempt={

                data

            }

        />

    );

}