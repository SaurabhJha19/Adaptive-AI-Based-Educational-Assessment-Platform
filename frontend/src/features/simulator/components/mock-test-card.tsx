"use client";

import { Clock3, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import simulatorService from "../simulator.service";
import { OfficialExam } from "../types";

type Props = {
  exam: OfficialExam;
};

export default function MockTestCard({ exam }: Props) {
  const router = useRouter();

  const startSimulation = useMutation({
    mutationFn: () => simulatorService.startSimulator(exam._id),

    onSuccess: (data: { attemptId: string }) => {
      router.push(`/simulator/attempt/${data.attemptId}`);
    },

    onError: () => {
      alert("Failed to start simulation.");
    },
  });

  return (
    <div className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="space-y-2">
        <span className="rounded-full border px-3 py-1 text-xs">
          {exam.examType}
        </span>

        <h3 className="text-xl font-semibold">
          {exam.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {exam.publisher || "Official Mock Test"}
        </p>
      </div>

      <div className="my-6 flex gap-6">
        <div className="flex items-center gap-2 text-sm">
          <Clock3 className="h-4 w-4" />
          {exam.duration} mins
        </div>

        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4" />
          {exam.totalQuestions} Questions
        </div>
      </div>

      <Button
        className="w-full"
        disabled={startSimulation.isPending}
        onClick={() => startSimulation.mutate()}
      >
        {startSimulation.isPending
          ? "Starting..."
          : "Start Simulation"}
      </Button>
    </div>
  );
}