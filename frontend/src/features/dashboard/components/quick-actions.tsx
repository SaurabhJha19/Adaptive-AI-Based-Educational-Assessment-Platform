import {
  Upload,
  Brain,
  GraduationCap,
  BarChart3,
} from "lucide-react";

const actions = [
  {
    title: "Upload Document",
    icon: Upload,
  },
  {
    title: "AI Assessment",
    icon: Brain,
  },
  {
    title: "Exam Simulator",
    icon: GraduationCap,
  },
  {
    title: "Analytics",
    icon: BarChart3,
  },
];

export default function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.title}
            className="rounded-2xl border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3">
              <Icon className="h-6 w-6 text-primary" />
            </div>

            <h3 className="font-semibold">
              {action.title}
            </h3>
          </button>
        );
      })}
    </div>
  );
}