import SectionCard from "@/components/shared/section-card";

export default function PerformanceSection() {
  return (
    <SectionCard
      title="Performance Trend"
      description="Chart will be connected later."
    >
      <div className="flex h-72 items-center justify-center rounded-xl border border-dashed">
        <p className="text-muted-foreground">
          Performance Chart Placeholder
        </p>
      </div>
    </SectionCard>
  );
}