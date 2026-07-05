"use client";

import { useParams } from "next/navigation";

import ExamPlayer from "@/features/exams/components/exam-player";

import {
    useSimulatorAttempt,
} from "@/features/simulator/hooks/use-simulator-attempt";

export default function SimulatorStartPage() {

    const { id: attemptId } =
        useParams<{ id: string }>();

    const {
        data,
        isLoading,
    } = useSimulatorAttempt(attemptId);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex h-screen items-center justify-center">
                Attempt not found
            </div>
        );
    }

    return (
        <ExamPlayer
            exam={data.exam}
            attemptId={attemptId}
        />
    );
}