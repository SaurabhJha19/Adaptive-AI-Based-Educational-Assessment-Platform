"use client";

import {
  useParams,
} from "next/navigation";

import {
  useResult,
} from "@/features/exams/use-result";

export default function ResultsPage() {

  const params =
    useParams();

  const examId =
    params.examId as string;

  const {
    data,
    isLoading,
  } = useResult(
    examId
  );

  if (isLoading) {

    return (
      <div className="p-6">
        Loading Results...
      </div>
    );
  }

  const result =
    data;

  return (
    <div className="max-w-4xl">

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Exam Results
      </h1>

      <div
        className="
        border
        rounded-lg
        p-6
        mb-6
        "
      >

        <div className="mb-4">
          <strong>
            Score:
          </strong>
          {" "}
          {result?.score}
          {" / "}
          {result?.totalQuestions}
        </div>

        <div className="mb-4">
          <strong>
            Percentage:
          </strong>
          {" "}
          {result?.percentage}%
        </div>

        <div className="mb-4">
          <strong>
            Correct Answers:
          </strong>
          {" "}
          {result?.correctAnswers}
        </div>

      </div>

    </div>
  );
}