"use client";

import Link from "next/link";

import {
  Calendar,
  ClipboardCheck,
  Clock3,
  PlayCircle,
  BarChart3,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Exam } from "../types";

type Props = {
  exam: Exam;
};

export default function ExamCard({ exam }: Props) {
  const completed = exam.status === "completed";

  return (
    <div className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">

      {/* Header */}

      <div className="p-6">

        <div className="flex items-start justify-between">

          <div className="flex gap-4">

            <div className="rounded-xl bg-primary/10 p-3">

              <GraduationCap className="h-7 w-7 text-primary" />

            </div>

            <div>

              <h3 className="line-clamp-2 text-lg font-semibold">

                {exam.title}

              </h3>

              <p className="mt-1 text-sm text-muted-foreground">

                {exam.description || "AI Generated Assessment"}

              </p>

            </div>

          </div>

          <Badge
            variant={
              completed
                ? "default"
                : "secondary"
            }
          >
            {completed ? "Completed" : "Pending"}
          </Badge>

        </div>

        {/* Metadata */}

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">

          <div className="flex items-center gap-2 text-muted-foreground">

            <ClipboardCheck className="h-4 w-4" />

            {exam.questions?.length ?? 0} Questions

          </div>

          <div className="flex items-center gap-2 text-muted-foreground">

            <Clock3 className="h-4 w-4" />

            {exam.duration ?? 30} mins

          </div>

          <div className="flex items-center gap-2 text-muted-foreground">

            <Calendar className="h-4 w-4" />

            {new Date(
              exam.createdAt
            ).toLocaleDateString()}

          </div>

          <div className="flex items-center gap-2">

            {completed ? (
              <>

                <BarChart3 className="h-4 w-4 text-green-600" />

                <span className="font-semibold text-green-600">

                  {exam.score ?? "--"}%

                </span>

              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4 text-amber-600" />
                <span className="text-amber-600">
                  Ready
                </span>
              </>
            )}

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-muted/30 p-4">

        <div className="flex gap-3">

          {completed ? (
            <Button
              asChild
              className="flex-1"
              variant="outline"
            >
              <Link
                href={`/results/exam/${exam._id}`}
              >
                View Results
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              className="flex-1"
            >
              <Link
                href={`/exams/${exam._id}/start`}
              >
                Start Exam
              </Link>
            </Button>
          )}

          <Button
            asChild
            variant="ghost"
            size="icon"
          >
            <Link
              href={`/exams/${exam._id}`}
            >
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>

        </div>

      </div>

    </div>
  );
}