import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 p-8">
      <Skeleton className="h-10 w-64" />

      <Skeleton className="h-14 w-full" />

      <Skeleton className="h-[500px] w-full" />
    </div>
  );
}