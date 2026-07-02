"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ExamToolbar() {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row">

      <div className="relative flex-1">

        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search exams..."
          className="pl-10"
        />

      </div>

    </div>
  );
}