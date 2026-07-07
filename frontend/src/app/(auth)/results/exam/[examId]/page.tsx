"use client";

import { useParams } from "next/navigation";

import PageContainer from "@/components/shared/page-container";

import ResultSummaryCard
from "@/features/results/components/result-summary-card";

import SectionBreakdown
from "@/features/results/components/section-breakdown";

import QuestionReviewList
from "@/features/results/components/question-review";

import {

    useQuestionReview,

    useResultSummary,

    useSectionResults,

} from "@/features/results/hooks/use-results";

export default function ResultPage() {

    const params =

        useParams();

    const id =

        params.id as string;

    const {

        data: summary,

        isLoading,

    } =

        useResultSummary(id);

    const {

        data: sections,

    } =

        useSectionResults(id);

    const {

        data: review,

    } =

        useQuestionReview(id);

    if (

        isLoading ||

        !summary

    ) {

        return (

            <PageContainer>

                Loading...

            </PageContainer>

        );

    }

    return (

        <PageContainer>

            <div className="space-y-8">

                <ResultSummaryCard

                    summary={summary}

                />

                <SectionBreakdown

                    sections={

                        sections ??

                        []

                    }

                />

                <QuestionReviewList

                    questions={

                        review ??

                        []

                    }

                />

            </div>

        </PageContainer>

    );

}