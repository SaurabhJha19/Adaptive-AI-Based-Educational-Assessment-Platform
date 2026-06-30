"use client";

import { useParams } from "next/navigation";

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
    isError,
  } = useResult(
    examId
  );

  if (isLoading) {

    return (
      <div className="max-w-4xl p-6">
        <h1 className="text-3xl font-bold">
          Loading Results...
        </h1>
      </div>
    );
  }

  if (isError) {

    return (
      <div className="max-w-4xl p-6">

        <h1
          className="
          text-3xl
          font-bold
          mb-4
          "
        >
          Exam Results
        </h1>

        <div
          className="
          border
          rounded-lg
          p-6
          "
        >
          Failed to load exam results.
        </div>

      </div>
    );
  }

  const result =
    data?.result;

  if (!result) {

    return (
      <div className="max-w-4xl p-6">

        <h1
          className="
          text-3xl
          font-bold
          mb-4
          "
        >
          Exam Results
        </h1>

        <div
          className="
          border
          rounded-lg
          p-6
          "
        >
          No result found.
        </div>

      </div>
    );
  }

  return (

    <div className="max-w-5xl">

      <h1
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        Exam Results
      </h1>

      <div
        className="
        border
        rounded-lg
        p-6
        mb-8
        "
      >

        <div className="mb-4">
          <strong>
            Score:
          </strong>
          {" "}
          {result.score}
          {" / "}
          {result.answers.length}
        </div>

        <div className="mb-4">
          <strong>
            Percentage:
          </strong>
          {" "}
          {result.percentage}%
        </div>

        <div className="mb-4">
          <strong>
            Submitted:
          </strong>
          {" "}
          {
            new Date(
              result.submittedAt
            ).toLocaleString()
          }
        </div>

      </div>

      <h2
        className="
        text-2xl
        font-semibold
        mb-4
        "
      >
        Answer Review
      </h2>

      <div className="space-y-4">

        {result.answers.map(
          (
            answer: any,
            index: number
          ) => (

            <div
              key={index}
              className="
              border
              rounded-lg
              p-5
              "
            >

              <div
                className="
                flex
                justify-between
                mb-3
                "
              >

                <h3
                  className="
                  font-semibold
                  "
                >
                  Question {index + 1}
                </h3>

                <span
                  className={
                    answer.isCorrect
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {
                    answer.isCorrect
                      ? "Correct"
                      : "Incorrect"
                  }
                </span>

              </div>

              <div className="mb-2">

                <strong>
                  Your Answer:
                </strong>

                {" "}

                {
                  answer.selectedAnswer
                }

              </div>

              <div>

                <strong>
                  Result:
                </strong>

                {" "}

                {
                  answer.isCorrect
                    ? "Correct"
                    : "Incorrect"
                }

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}