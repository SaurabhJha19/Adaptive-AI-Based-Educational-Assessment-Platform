import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
}: Props) {
  return (
    <div className="rounded-2xl border bg-card p-6 transition-all hover:shadow-lg">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-2 text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}