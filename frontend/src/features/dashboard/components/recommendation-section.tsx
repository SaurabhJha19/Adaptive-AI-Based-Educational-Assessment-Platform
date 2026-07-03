"use client";

import SectionCard from "@/components/shared/section-card";

type Props = {
  recommendation: {
    title: string;
    description: string;
  };
};

export default function RecommendationSection({
  recommendation,
}: Props) {
  return (
    <SectionCard
      title="AI Recommendation"
      description="Personalized recommendation."
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Focus Area
          </p>

          <h3 className="font-semibold">
            {recommendation.title}
          </h3>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Recommendation
          </p>

          <p>{recommendation.description}</p>
        </div>
      </div>
    </SectionCard>
  );
}