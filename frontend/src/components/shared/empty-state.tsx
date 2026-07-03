import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-dashed p-16 text-center">
      <div className="mx-auto mb-4 w-fit rounded-full bg-primary/10 p-4">
        <Icon className="h-8 w-8 text-primary" />
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}