"use client";

import { useRouter } from "next/navigation";

import SectionCard from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";

type Props = {
  attempt: any;
};

export default function ContinueLearning({
  attempt,
}: Props) {
  const router = useRouter();

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

  const handleContinue = () => {
    if (attempt.sourceType === "simulator") {
      router.push(
        `/simulator/attempt/${attempt._id}`
      );
      return;
    }

    router.push(
      `/exams/${attempt.examId}/start?attempt=${attempt._id}`
    );
  };

  return (
    <SectionCard
      title="Continue Learning"
      description="Resume your latest assessment."
    >
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold">
            {attempt.examId?.title ??
              attempt.title ??
              "Assessment"}
          </h3>

          <p className="text-sm text-muted-foreground">
            Status: {attempt.status}
          </p>
        </div>

        <Button
          className="w-full"
          onClick={handleContinue}
        >
          Resume Assessment
        </Button>
      </div>
    </SectionCard>
  );
}