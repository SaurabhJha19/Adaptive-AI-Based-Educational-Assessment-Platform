"use client";

import Link from "next/link";

import {
  useExams,
} from "@/features/exams/use-exams";

import {
  Exam,
} from "@/types/exam";

export default function ExamsPage() {

  const {
    data,
    isLoading,
  } = useExams();

  return (
    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Exams
      </h1>

      {isLoading && (
        <p>
          Loading...
        </p>
      )}

      {data?.exams?.map(
        (
          exam: Exam
        ) => (

          <div
            key={
              exam._id
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
              text-lg
              "
            >
              {exam.title}
            </h2>

            <p>
              Questions:
              {" "}
              {exam.totalQuestions}
            </p>

            <p>
              Status:
              {" "}
              {exam.status}
            </p>

            <Link
              href={`/exams/${exam._id}`}
              className="
              inline-block
              mt-3
              border
              px-3
              py-1
              rounded
              "
            >
              Open Exam
            </Link>

          </div>
        )
      )}

    </div>
  );
}