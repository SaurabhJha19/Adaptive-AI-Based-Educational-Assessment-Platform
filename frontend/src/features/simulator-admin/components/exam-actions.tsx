"use client";

import Link from "next/link";
import { Eye, Trash2, Rocket, Archive } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  usePublishOfficialExam,
  useArchiveOfficialExam,
  useDeleteOfficialExam,
} from "../hooks/use-official-exams";

interface Props {
  examId: string;
  status: string;
}

export default function ExamActions({
  examId,
  status,
}: Props) {
  const publishMutation = usePublishOfficialExam();
  const archiveMutation = useArchiveOfficialExam();
  const deleteMutation = useDeleteOfficialExam();

  const publish = () => {
    publishMutation.mutate(examId);
  };

  const archive = () => {
    archiveMutation.mutate(examId);
  };

  const remove = () => {
    if (!confirm("Delete this exam?")) return;

    deleteMutation.mutate(examId);
  };

  return (
    <div className="flex items-center gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href={`/simulator-admin/${examId}`}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>

      {status === "REVIEW" && (
        <Button
          size="sm"
          onClick={publish}
          disabled={publishMutation.isPending}
        >
          <Rocket className="h-4 w-4" />
        </Button>
      )}

      {status === "PUBLISHED" && (
        <Button
          size="sm"
          variant="secondary"
          onClick={archive}
          disabled={archiveMutation.isPending}
        >
          <Archive className="h-4 w-4" />
        </Button>
      )}

      <Button
        size="sm"
        variant="destructive"
        onClick={remove}
        disabled={deleteMutation.isPending}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}