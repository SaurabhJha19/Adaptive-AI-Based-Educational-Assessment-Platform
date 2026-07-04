"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import simulatorService from "@/features/simulator/simulator.service";
import SimulatorPlayer from "@/features/simulator/components/simulator-player";

export default function SimulatorStartPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["simulator-attempt", id],
    queryFn: () => simulatorService.getAttempt(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError || !data?.exam) {
    return (
      <div className="flex h-screen items-center justify-center">
        Exam not found
      </div>
    );
  }

  return (
<SimulatorPlayer
    exam={data.exam}
    attempt={data.attempt}
/>
  );
}