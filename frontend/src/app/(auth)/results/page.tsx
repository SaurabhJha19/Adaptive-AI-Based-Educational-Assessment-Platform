"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import Link from "next/link";

export default function ResultsPage() {
  const [attempts, setAttempts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    api
      .get("/exam-attempt")
      .then((res) =>
        setAttempts(
          res.data.attempts
        )
      )
      .finally(() =>
        setLoading(false)
      );
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">
        Results
      </h1>

      {attempts.length === 0 && (
        <p>
          No completed assessments.
        </p>
      )}

      {attempts.map((attempt) => (
        <Link
          key={attempt._id}
          href={`/results/exam/${attempt.examId}`}
          className="block rounded-xl border p-5 hover:border-primary"
        >
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">
                {attempt.examId}
              </h3>

              <p className="text-sm text-muted-foreground">
                {new Date(
                  attempt.createdAt
                ).toLocaleDateString(
                  "en-IN"
                )}
              </p>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold">
                {attempt.percentage.toFixed(
                  0
                )}
                %
              </div>

              <div className="text-sm text-muted-foreground">
                {attempt.score}/
                {attempt.totalQuestions}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}