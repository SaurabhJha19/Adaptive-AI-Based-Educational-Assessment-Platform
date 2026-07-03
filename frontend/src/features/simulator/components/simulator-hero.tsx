import { GraduationCap } from "lucide-react";

export default function SimulatorHero() {
  return (
    <div className="rounded-3xl border bg-card p-8">
      <div className="flex items-center justify-between">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>

            <h1 className="text-4xl font-bold">
              Exam Simulator
            </h1>
          </div>

          <p className="text-muted-foreground text-lg">
            Practice official mock examinations for GRE, SAT,
            TOEFL, GMAT, IELTS and ACT in a real exam environment.
          </p>
        </div>
      </div>
    </div>
  );
}