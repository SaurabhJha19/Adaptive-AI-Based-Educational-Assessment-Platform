import { Button } from "@/components/ui/button";

export default function DashboardHero() {
  return (
    <div className="rounded-3xl border bg-card p-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Continue your AI-powered learning journey with personalized
            assessments and official exam simulations.
          </p>
        </div>

        <div className="flex gap-3">
          <Button>Upload Notes</Button>

          <Button variant="outline">
            Generate Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}