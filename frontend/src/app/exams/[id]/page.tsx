"use client";

import { useState } from "react";

import {
  useParams,
  useRouter,
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

  const router =
    useRouter();

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

        router.push(
          `/results/${examId}`
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
      <div className="p-6">
        Loading Exam...
      </div>
    );
  }

  const exam =
    data?.exam;

  if (!exam) {

    return (
      <div className="p-6">
        Exam not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl">

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        {exam.title}
      </h1>

      <div className="space-y-6">

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
              p-5
              "
            >

              <h2
                className="
                font-semibold
                text-lg
                mb-4
                "
              >
                Q{index + 1}.{" "}
                {question.question}
              </h2>

              <div className="space-y-2">

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
                      gap-3
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

                      <span>
                        {option}
                      </span>

                    </label>
                  )
                )}

              </div>

            </div>
          )
        )}

      </div>

      <button
        onClick={
          handleSubmit
        }
        disabled={
          submitMutation.isPending
        }
        className="
        mt-8
        border
        rounded-lg
        px-6
        py-3
        font-medium
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