"use client";

import { Card } from "@/components/ui/card";

interface Props {
  exam: any;
  attempt: any;
}

export default function SimulatorPlayer({
  exam,
  attempt,
}: Props) {
  return (
    <div className="container mx-auto max-w-7xl p-6">

      <Card className="p-6">

        <h1 className="text-3xl font-bold">
          {exam.title}
        </h1>

        <p className="text-muted-foreground mt-2">
          Official Simulator
        </p>

      </Card>

      <Card className="mt-6 p-6">

        <pre className="text-xs overflow-auto">
          {JSON.stringify(exam, null, 2)}
        </pre>

      </Card>

    </div>
  );
}