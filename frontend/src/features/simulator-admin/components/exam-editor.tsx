"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import PublishDialog from "./publish-dialog";
import DeleteDialog from "./delete-dialog";

interface Props {
  examId: string;
  status: string;
}

export default function ExamActions({
  examId,
  status,
}: Props) {
  return (
    <div className="flex items-center gap-2">

      <Button
        asChild
        variant="outline"
        size="icon"
      >
        <Link href={`/simulator-admin/${examId}`}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>

      {status !== "PUBLISHED" && (
        <PublishDialog examId={examId} />
      )}

      <DeleteDialog examId={examId} />

    </div>
  );
}