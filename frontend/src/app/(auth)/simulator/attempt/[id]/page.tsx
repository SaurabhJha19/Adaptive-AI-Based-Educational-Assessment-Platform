"use client";

import { useParams } from "next/navigation";

import { useSimulatorAttempt } from "@/features/simulator/hooks/use-simulator-attempt";

export default function SimulatorAttemptPage() {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading } =
    useSimulatorAttempt(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}