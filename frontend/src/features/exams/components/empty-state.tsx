"use client";

import { ClipboardList } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20">

      <ClipboardList className="mb-4 h-12 w-12 text-muted-foreground" />

      <h3 className="text-xl font-semibold">
        No exams yet
      </h3>

      <p className="mt-2 text-muted-foreground">
        Generate your first AI assessment from a document.
      </p>

    </div>
  );
}