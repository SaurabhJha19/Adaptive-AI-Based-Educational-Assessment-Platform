import Link from "next/link";

import {
  ClipboardList,
  ArrowRight,
} from "lucide-react";

type ExamItem = {
  id: string;
  title: string;
  score: number;
  difficulty: string;
  completedAt: string;
};

type Props = {
  exams: ExamItem[];
};

export default function RecentExams({
  exams,
}: Props) {

  return (

    <div className="space-y-4">

      {exams.length === 0 ? (

        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed text-muted-foreground">

          No exams completed yet.

        </div>

      ) : (

        exams.map((exam) => (

          <div
            key={exam.id}
            className="rounded-xl border p-5 transition hover:bg-muted/40"
          >

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-primary/10 p-3">

                  <ClipboardList className="h-5 w-5 text-primary" />

                </div>

                <div>

                  <h3 className="font-semibold">

                    {exam.title}

                  </h3>

                  <p className="text-sm capitalize text-muted-foreground">

                    {exam.difficulty}

                  </p>

                </div>

              </div>

              <span className="text-2xl font-bold">

                {exam.score}%

              </span>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <p className="text-sm text-muted-foreground">

                {exam.completedAt}

              </p>

              <Link
                href="/results"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
              >

                Review

                <ArrowRight className="h-4 w-4" />

              </Link>

            </div>

          </div>

        ))

      )}

    </div>

  );

}