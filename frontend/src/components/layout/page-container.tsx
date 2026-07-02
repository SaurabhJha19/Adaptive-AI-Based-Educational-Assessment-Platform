import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-7xl p-6 md:p-8",
        className
      )}
    >
      {children}
    </main>
  );
}