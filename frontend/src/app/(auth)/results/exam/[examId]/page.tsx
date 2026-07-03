"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import ResultsSummary from "@/features/exams/components/results-summary";
import QuestionReviewCard from "@/features/exams/components/question-review-card";

import { useExamResult } from "@/features/exams/use-exam-result";
import { useExamResultQuery } from "@/features/exams/use-exam-result-query";

export default function ExamResultsPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const examId =
    params.examId as string;

  const cached =
    useExamResult(examId);

  const {
    data,
    isLoading,
  } =
    useExamResultQuery(examId);

  const result =
    cached ?? data;

  if (isLoading && !result) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        Loading Results...

      </div>

    );

  }

  if (!result) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <div className="space-y-6 text-center">

          <h1 className="text-3xl font-bold">

            Result Not Found

          </h1>

          <Button
            onClick={() =>
              router.push("/dashboard")
            }
          >

            Back to Dashboard

          </Button>

        </div>

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-6xl space-y-8 p-8">

      <ResultsSummary
        result={result}
      />

      <div>

        <h2 className="mb-6 text-3xl font-bold">

          Question Review

        </h2>

        <div className="space-y-6">

          {result.review.map(
            review => (

              <QuestionReviewCard
                key={review.questionId}
                review={review}
              />

            )
          )}

        </div>

      </div>

      <div className="flex justify-center gap-4">

        <Button
          variant="outline"
          onClick={() =>
            router.push("/dashboard")
          }
        >
          Dashboard
        </Button>

        <Button
          onClick={() =>
            router.push("/simulator")
          }
        >
          Take Another Exam
        </Button>

      </div>

    </div>

  );

}