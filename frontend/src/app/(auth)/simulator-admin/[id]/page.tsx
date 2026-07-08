"use client";

import { useEffect } from "react";
import { notFound, useParams, useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-provider";

import { useOfficialExam } from "@/features/simulator-admin/hooks/use-official-exams";

import ReviewPage from "@/features/simulator-admin/components/review-page";

export default function OfficialExamReview() {

    const router = useRouter();

    const {
        user,
        isLoading: authLoading,
    } = useAuth();

    useEffect(() => {

        if (
            !authLoading &&
            user?.role !== "admin"
        ) {

            router.replace("/dashboard");

        }

    }, [authLoading, user, router]);

    const { id } =
        useParams<{ id: string }>();

    const {
        data,
        isLoading,
    } = useOfficialExam(id);

    if (authLoading)
        return null;

    if (user?.role !== "admin")
        return null;

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