"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import simulatorService from "@/features/simulator/simulator.service";

export default function SimulatorResultPage() {

    const { id } =
        useParams<{ id: string }>();

    const {

        data,

        isLoading,

    } = useQuery({

        queryKey: [
            "simulator-result",
            id,
        ],

        queryFn: () =>
            simulatorService.getResult(
                id
            ),

    });

    if (isLoading) {

        return (

            <div className="flex h-screen items-center justify-center">

                Loading...

            </div>

        );

    }

const attempt =
    data?.attempt;

if (!attempt) {

    return (

        <div className="flex h-screen items-center justify-center">

            Result not available.

        </div>

    );

}

    return (

        <div className="mx-auto max-w-5xl py-10">

            <h1 className="mb-8 text-4xl font-bold">

                Exam Result

            </h1>

            <div className="grid grid-cols-4 gap-5">

                <Card
                    title="Score"
                    value={`${attempt.score}/${attempt.totalQuestions}`}
                />

                <Card
                    title="Percentage"
                    value={`${attempt.percentage}%`}
                />

                <Card
                    title="Correct"
                    value={attempt.score}
                />

                <Card
                    title="Incorrect"
                    value={
                        attempt.totalQuestions -
                        attempt.score
                    }
                />

            </div>

        </div>

    );

}

function Card({

    title,

    value,

}: {

    title: string;

    value: string | number;

}) {

    return (

        <div className="rounded-xl border bg-white p-6">

            <p className="text-gray-500">

                {title}

            </p>

            <h2 className="mt-2 text-3xl font-bold">

                {value}

            </h2>

        </div>

    );

}