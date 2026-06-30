"use client";

import {
  useParams,
} from "next/navigation";

export default function AttemptResultPage() {

  const params =
    useParams();

  const attemptId =
    params.attemptId as string;

  return (
    <div className="max-w-4xl">

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Attempt Result
      </h1>

      <div
        className="
        border
        rounded-lg
        p-6
        "
      >

        <p>
          Attempt ID:
          {" "}
          {attemptId}
        </p>

        <p className="mt-4">
          Attempt-based review
          will be implemented
          in a future sprint.
        </p>

      </div>

    </div>
  );
}