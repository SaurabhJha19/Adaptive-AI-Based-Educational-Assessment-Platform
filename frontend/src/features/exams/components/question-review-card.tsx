import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { ExamReview } from "../types";

type Props = {
  review: ExamReview;
};

export default function QuestionReviewCard({
  review,
}: Props) {

  return (

    <div className="rounded-xl border p-6">

      <div className="mb-6 flex items-start justify-between">

        <h2 className="text-xl font-semibold">

          {review.question}

        </h2>

        {review.isCorrect ? (

          <CheckCircle2 className="h-6 w-6 text-green-600" />

        ) : (

          <XCircle className="h-6 w-6 text-red-600" />

        )}

      </div>

      <div className="space-y-3">

        <div>

          <p className="font-semibold">

            Your Answer

          </p>

          <p>{review.selectedAnswer}</p>

        </div>

        <div>

          <p className="font-semibold">

            Correct Answer

          </p>

          <p>{review.correctAnswer}</p>

        </div>

        <div>

          <p className="font-semibold">

            Difficulty

          </p>

          <p className="capitalize">

            {review.difficulty}

          </p>

        </div>

        <div className="rounded-lg bg-muted p-4">

          <p className="mb-2 font-semibold">

            AI Explanation

          </p>

          <p className="leading-7">

            {review.explanation}

          </p>

        </div>

      </div>

    </div>

  );

}