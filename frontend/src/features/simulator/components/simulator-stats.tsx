import {
  BookOpen,
  Clock3,
  FileText,
  Trophy,
} from "lucide-react";

interface Props {
  available: number;
  completed?: number;
  average?: number;
  studyTime?: string;
}

export default function SimulatorStats({
  available,
  completed = 0,
  average = 0,
  studyTime = "0h",
}: Props) {
  const stats = [
    {
      title: "Available",
      value: available.toString(),
      icon: BookOpen,
    },
    {
      title: "Completed",
      value: completed.toString(),
      icon: FileText,
    },
    {
      title: "Average",
      value: `${average}%`,
      icon: Trophy,
    },
    {
      title: "Study Time",
      value: studyTime,
      icon: Clock3,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border bg-card p-6"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {item.value}
                </h2>
              </div>

              <div className="rounded-xl bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}