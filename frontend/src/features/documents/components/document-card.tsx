"use client";

import { useRouter } from "next/navigation";

import {
  Brain,
  Eye,
  FileText,
  GraduationCap,
  Trash2,
  Calendar,
  HardDrive,
  ChevronRight,
} from "lucide-react";

import { Document } from "@/types/document";

import GenerateExamDialog from "@/features/exams/components/generate-exam-dialog";

import StatusBadge from "./status-badge";

type Props = {
  document: Document;
  onDelete?: (id: string) => void;
};

export default function DocumentCard({
  document,
  onDelete,
}: Props) {
  const router = useRouter();

  const handleDelete = () => {
    if (!window.confirm("Delete this document?")) return;

    onDelete?.(document._id);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">

      {/* Header */}

      <div className="p-6">

        <div className="flex items-start justify-between">

          <div className="flex items-start gap-4">

            <div className="rounded-2xl bg-primary/10 p-4 transition group-hover:bg-primary/20">

              <FileText className="h-8 w-8 text-primary" />

            </div>

            <div>

              <h3 className="line-clamp-1 text-lg font-semibold">

                {document.originalName}

              </h3>

              <div className="mt-3">

                <StatusBadge
                  status={document.status}
                />

              </div>

            </div>

          </div>

        </div>

        {/* Metadata */}

        <div className="mt-6 space-y-3 text-sm text-muted-foreground">

          <div className="flex items-center gap-2">

            <HardDrive className="h-4 w-4" />

            <span>

              {(document.fileSize / 1024 / 1024).toFixed(2)} MB

            </span>

          </div>

          <div className="flex items-center gap-2">

            <Calendar className="h-4 w-4" />

            <span>

              Uploaded{" "}

              {new Date(
                document.createdAt
              ).toLocaleDateString()}

            </span>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-muted/20 p-4">

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() =>
              router.push(
                `/chat?documentId=${document._id}`
              )
            }
            className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-background"
          >

            <Eye className="h-4 w-4" />

            Preview

          </button>

            {document.status === "processed" ? (
                <GenerateExamDialog
                    documentId={document._id}
                    documentName={document.originalName}
                >
                    <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
                        <GraduationCap className="h-4 w-4" />
                        Generate
                    </button>
                </GenerateExamDialog>
            ) : (
                <button
                    disabled
                    className="flex items-center justify-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm"
                >
                    Processing...
                </button>
            )}

          <button
            onClick={() =>
              router.push(
                `/chat?documentId=${document._id}`
              )
            }
            className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-background"
          >

            <Brain className="h-4 w-4" />

            Ask AI

          </button>

          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/20"
          >

            <Trash2 className="h-4 w-4" />

            Delete

          </button>

        </div>

        <button
          onClick={() =>
            router.push(
              `/chat?documentId=${document._id}`
            )
          }
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-muted py-3 text-sm font-medium transition hover:bg-muted/70"
        >

          View Full Details

          <ChevronRight className="h-4 w-4" />

        </button>

      </div>

    </div>
  );
}