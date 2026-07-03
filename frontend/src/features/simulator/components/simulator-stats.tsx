import {
    BookOpen,
    Clock3,
    Trophy,
    FileText,
} from "lucide-react";

const stats = [
    {
        title: "Available",
        value: "48",
        icon: BookOpen,
    },
    {
        title: "Completed",
        value: "12",
        icon: FileText,
    },
    {
        title: "Average",
        value: "84%",
        icon: Trophy,
    },
    {
        title: "Study Time",
        value: "36h",
        icon: Clock3,
    },
];

export default function SimulatorStats() {
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