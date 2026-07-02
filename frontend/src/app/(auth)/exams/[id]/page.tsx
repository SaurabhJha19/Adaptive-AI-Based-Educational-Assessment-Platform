"use client";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Clock,
  FileText,
  Brain,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  useExam,
} from "@/features/exams/use-exam";

export default function ExamInstructionsPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const {
    data: exam,
    isLoading,
  } = useExam(
    params.id as string
  );

  if (isLoading) {

    return (
      <div className="flex h-screen items-center justify-center">

        Loading...

      </div>
    );

  }

  if (!exam) {

    return (
      <div className="flex h-screen items-center justify-center">

        Exam not found.

      </div>
    );

  }

  const estimatedMinutes =
    Math.max(
      5,
      exam.totalQuestions * 2
    );

  return (

    <div className="mx-auto max-w-4xl p-8">

      <div className="rounded-xl border bg-card p-8">

        <h1 className="text-3xl font-bold">

          {exam.title}

        </h1>

        <p className="mt-2 text-muted-foreground">

          Please read the instructions carefully before starting.

        </p>

        <div className="mt-8 grid grid-cols-3 gap-4">

          <div className="rounded-lg border p-4">

            <FileText className="mb-3 h-6 w-6" />

            <p className="text-sm text-muted-foreground">

              Questions

            </p>

            <h2 className="text-2xl font-bold">

              {exam.totalQuestions}

            </h2>

          </div>

          <div className="rounded-lg border p-4">

            <Clock className="mb-3 h-6 w-6" />

            <p className="text-sm text-muted-foreground">

              Estimated Time

            </p>

            <h2 className="text-2xl font-bold">

              {estimatedMinutes} min

            </h2>

          </div>

          <div className="rounded-lg border p-4">

            <Brain className="mb-3 h-6 w-6" />

            <p className="text-sm text-muted-foreground">

              AI Generated

            </p>

            <h2 className="text-2xl font-bold">

              Yes

            </h2>

          </div>

        </div>

        <div className="mt-10">

          <h2 className="mb-4 text-xl font-semibold">

            Instructions

          </h2>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">

            <li>
              Read every question carefully.
            </li>

            <li>
              Select the best answer before moving on.
            </li>

            <li>
              You can review answers before submitting.
            </li>

            <li>
              Your exam will be evaluated instantly.
            </li>

            <li>
              AI explanations will be available after completion.
            </li>

          </ul>

        </div>

        <div className="mt-10 flex justify-end gap-4">

          <Button
            variant="outline"
            onClick={() =>
              router.push(
                "/documents"
              )
            }
          >

            Cancel

          </Button>

          <Button
            onClick={() =>
              router.push(
                `/exams/${exam._id}/start`
              )
            }
          >

            Start Exam

          </Button>

        </div>

      </div>

    </div>

  );

}