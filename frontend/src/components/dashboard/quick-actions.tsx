import Link from "next/link";
import { Upload, ClipboardList } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="mb-8 flex flex-wrap gap-4">

      <Link
        href="/documents"
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground transition hover:opacity-90"
      >
        <Upload className="h-5 w-5" />

        Upload Document
      </Link>

      <Link
        href="/exams"
        className="inline-flex items-center gap-2 rounded-xl border bg-card px-5 py-3 transition hover:bg-muted"
      >
        <ClipboardList className="h-5 w-5" />

        Generate Exam
      </Link>

    </div>
  );
}