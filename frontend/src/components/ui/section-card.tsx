import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionCard({
  title,
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      {title && (
        <h2 className="mb-5 text-xl font-semibold">
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}