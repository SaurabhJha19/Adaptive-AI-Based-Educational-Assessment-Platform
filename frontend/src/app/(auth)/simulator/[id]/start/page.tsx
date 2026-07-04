"use client";

import { useParams } from "next/navigation";

import ExamPlayer from "@/features/exams/components/exam-player";

import {
    useOfficialExam,
} from "@/features/simulator-admin/hooks/use-official-exams";

export default function SimulatorStartPage() {

    const { id } =
        useParams<{ id:string }>();

    const {
        data: exam,
        isLoading,
    } =
        useOfficialExam(id);

    if(isLoading){

        return(
            <div className="flex h-screen items-center justify-center">

                Loading...

            </div>
        );

    }

    if(!exam){

        return(
            <div className="flex h-screen items-center justify-center">

                Exam not found

            </div>
        );

    }

    return(

        <ExamPlayer
            exam={exam}
            simulator
        />

    );

}