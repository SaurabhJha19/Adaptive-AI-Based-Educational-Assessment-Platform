"use client";

import Link from "next/link";

import { useExams } from "@/features/exams/use-exams";

import { Exam } from "@/features/exams/types";

export default function ExamsPage() {

  const {

    data: exams,

    isLoading,

  } = useExams();

  if (isLoading) {

    return (

      <div className="p-8">

        Loading exams...

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-5xl p-8">

      <h1 className="mb-8 text-3xl font-bold">

        My Exams

      </h1>

      {!exams?.length && (

        <div className="rounded-lg border p-8 text-center">

          <p className="text-muted-foreground">

            No exams found.

          </p>

        </div>

      )}

      <div className="space-y-4">

        {exams?.map((exam: Exam) => (

          <div
            key={exam._id}
            className="rounded-xl border p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold">

                  {exam.title}

                </h2>

                <p className="mt-2 text-muted-foreground">

                  {exam.totalQuestions} Questions

                </p>

                <p className="capitalize text-sm">

                  Status: {exam.status}

                </p>

              </div>

              <Link
                href={`/exams/${exam._id}`}
                className="rounded-md border px-4 py-2 hover:bg-muted transition"
              >

                Open Exam

              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}