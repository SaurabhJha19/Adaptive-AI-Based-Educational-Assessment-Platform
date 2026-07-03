"use client";

import SectionCard from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";

type Props = {
  attempt: any;
};

export default function ContinueLearning({
  attempt,
}: Props) {
  if (!attempt) {
    return (
      <SectionCard
        title="Continue Learning"
        description="No unfinished assessment."
      >
        <p className="text-muted-foreground">
          Start a new AI Assessment or Simulator.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Continue Learning"
      description="Resume your latest assessment."
    >
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold">
            {attempt.title ?? "Assessment"}
          </h3>

          <p className="text-sm text-muted-foreground">
            Status: {attempt.status}
          </p>
        </div>

        <Button className="w-full">
          Resume Assessment
        </Button>
      </div>
    </SectionCard>
  );
}