"use client";

import { notFound, useParams } from "next/navigation";

import { useOfficialExam } from "@/features/simulator-admin/hooks/use-official-exams";

import ReviewPage from "@/features/simulator-admin/components/review-page";

export default function OfficialExamReview() {

    const { id } =
        useParams<{ id: string }>();

    const {
        data,
        isLoading,
    } = useOfficialExam(id);

    if (isLoading)
        return <p>Loading...</p>;

    if (!data)
        return notFound();

    return (
        <ReviewPage
            exam={data}
        />
    );

}