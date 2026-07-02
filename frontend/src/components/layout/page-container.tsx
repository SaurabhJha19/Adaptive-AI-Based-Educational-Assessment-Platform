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
        "w-full flex-1 p-8 lg:p-10",
        className
      )}
    >
      {children}
    </main>
  );
}