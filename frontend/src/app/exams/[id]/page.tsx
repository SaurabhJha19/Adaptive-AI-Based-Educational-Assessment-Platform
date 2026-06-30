"use client";

import { useState } from "react";

import {
  useParams,
} from "next/navigation";

import {
  useExam,
} from "@/features/exams/use-exam";

import {
  useSubmitExam,
} from "@/features/exams/use-submit-exam";

export default function ExamDetailPage() {

  const params =
    useParams();

  const examId =
    params.id as string;

  const {
    data,
    isLoading,
  } = useExam(
    examId
  );

  const submitMutation =
    useSubmitExam();

  const [
    answers,
    setAnswers,
  ] = useState<
    Record<string, string>
  >({});

  const handleSubmit =
    async () => {

      try {

        const formattedAnswers =
          Object.entries(
            answers
          ).map(
            ([
              questionId,
              selectedAnswer,
            ]) => ({
              questionId,
              selectedAnswer,
            })
          );

        const result =
          await submitMutation.mutateAsync({
            examId,
            answers:
              formattedAnswers,
          });

        alert(
          `Score: ${result.score}/${result.totalQuestions}
Percentage: ${result.percentage}%`
        );

        console.log(
          result
        );

      } catch (
        error
      ) {

        console.error(
          error
        );

        alert(
          "Failed to submit exam"
        );
      }
    };

  if (isLoading) {

    return (
      <div>
        Loading Exam...
      </div>
    );
  }

  const exam =
    data?.exam;

  if (!exam) {

    return (
      <div>
        Exam not found
      </div>
    );
  }

  return (
    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        {exam.title}
      </h1>

      {exam.questions?.map(
        (
          question: any,
          index: number
        ) => (

          <div
            key={
              question._id
            }
            className="
            border
            rounded-lg
            p-4
            mb-4
            "
          >

            <h2
              className="
              font-semibold
              mb-3
              "
            >
              Q{index + 1}.{" "}
              {question.question}
            </h2>

            {question.options?.map(
              (
                option: string
              ) => (

                <label
                  key={
                    option
                  }
                  className="
                  flex
                  items-center
                  gap-2
                  py-1
                  cursor-pointer
                  "
                >

                  <input
                    type="radio"
                    name={
                      question._id
                    }
                    value={
                      option
                    }
                    checked={
                      answers[
                        question._id
                      ] === option
                    }
                    onChange={() =>
                      setAnswers(
                        (
                          prev
                        ) => ({
                          ...prev,
                          [question._id]:
                            option,
                        })
                      )
                    }
                  />

                  {option}

                </label>
              )
            )}

          </div>
        )
      )}

      <button
        onClick={
          handleSubmit
        }
        disabled={
          submitMutation.isPending
        }
        className="
        border
        px-4
        py-2
        rounded
        mt-6
        "
      >
        {
          submitMutation.isPending
            ? "Submitting..."
            : "Submit Exam"
        }
      </button>

    </div>
  );
}