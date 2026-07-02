import {
  CheckCircle2,
  XCircle,
  Trophy,
} from "lucide-react";

import { ExamResult } from "../types";

type Props = {
  result: ExamResult;
};

export default function ResultsSummary({
  result,
}: Props) {

  return (

    <div className="rounded-2xl border bg-card p-8 shadow-sm">

      <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background p-10">

        <div className="flex flex-col items-center">

          <div className="mb-6 rounded-full bg-primary/10 p-5">

            <Trophy className="h-14 w-14 text-yellow-500" />

          </div>

          <h1 className="text-7xl font-extrabold tracking-tight">

            {Math.round(result.percentage)}%

          </h1>

          <p className="mt-4 text-xl text-muted-foreground">

            Excellent Performance

          </p>

        </div>

      </div>

      <div className="mt-8">

        <div className="h-3 overflow-hidden rounded-full bg-muted">

          <div
            className="h-full bg-primary transition-all"
            style={{
              width: `${result.percentage}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-10 grid grid-cols-3 gap-6">

        <div className="rounded-xl border p-6 text-center">

          <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-green-600" />

          <p className="text-3xl font-bold">

            {result.correctAnswers}

          </p>

          <p className="text-muted-foreground">

            Correct

          </p>

        </div>

        <div className="rounded-xl border p-6 text-center">

          <XCircle className="mx-auto mb-3 h-8 w-8 text-red-600" />

          <p className="text-3xl font-bold">

            {result.incorrectAnswers}

          </p>

          <p className="text-muted-foreground">

            Incorrect

          </p>

        </div>

        <div className="rounded-xl border p-6 text-center">

          <p className="mb-3 text-3xl">

            📄

          </p>

          <p className="text-3xl font-bold">

            {result.totalQuestions}

          </p>

          <p className="text-muted-foreground">

            Questions

          </p>

        </div>

      </div>

    </div>

  );

}