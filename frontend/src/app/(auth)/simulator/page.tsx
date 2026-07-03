"use client";

import { useState } from "react";

import SimulatorHero from "@/features/simulator/components/simulator-hero";
import SimulatorStats from "@/features/simulator/components/simulator-stats";
import ExamTypeTabs from "@/features/simulator/components/exam-type-tabs";
import MockTestCard from "@/features/simulator/components/mock-test-card";

import { EXAM_CATALOG } from "@/features/simulator/exam-catalog";
import { useSimulator } from "@/features/simulator/hooks/use-simulator";
import { OfficialExam } from "@/features/simulator/types";

export default function SimulatorPage() {
  const [selectedExamType, setSelectedExamType] = useState("GRE");

  const { data, isLoading, error } = useSimulator(selectedExamType);

  const exams: OfficialExam[] = data ?? [];

  return (
    <div className="space-y-8">

      <SimulatorHero />

      <SimulatorStats />

      <ExamTypeTabs
        value={selectedExamType}
        onChange={setSelectedExamType}
        items={EXAM_CATALOG}
      />

      {isLoading && (
        <div className="flex justify-center py-20">
          <p className="text-muted-foreground">
            Loading mock examinations...
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-8">
          <p className="text-destructive">
            Failed to load simulator exams.
          </p>
        </div>
      )}

      {!isLoading && !error && exams.length === 0 && (
        <div className="rounded-2xl border border-dashed p-16 text-center">
          <h3 className="text-xl font-semibold">
            No Mock Tests Available
          </h3>

          <p className="mt-2 text-muted-foreground">
            There are currently no published mock tests for{" "}
            <span className="font-medium">{selectedExamType}</span>.
          </p>
        </div>
      )}

      {!isLoading && exams.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {exams.map((exam) => (
            <MockTestCard
              key={exam._id}
              exam={exam}
            />
          ))}
        </div>
      )}
    </div>
  );
}