"use client";

import SectionCard from "@/components/shared/section-card";

type Props = {
  activity: any[];
};

export default function RecentActivity({
  activity,
}: Props) {
  return (
    <SectionCard
      title="Recent Activity"
      description="Latest learning activity."
    >
      <div className="space-y-4">
        {activity.length === 0 && (
          <p className="text-muted-foreground">
            No recent activity.
          </p>
        )}

        {activity.map((item) => (
          <div
            key={item._id}
            className="border-l-2 border-primary pl-4"
          >
            <p className="font-medium">
              {item.status}
            </p>

            <p className="text-sm text-muted-foreground">
              Score: {item.percentage ?? 0}%
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}