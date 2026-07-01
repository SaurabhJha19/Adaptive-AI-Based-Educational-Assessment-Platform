"use client";

import { useRouter } from "next/navigation";

import {
  Brain,
  Eye,
  FileText,
  GraduationCap,
  Trash2,
} from "lucide-react";

import { Document } from "@/types/document";

import StatusBadge from "./status-badge";

type Props = {
  document: Document;
  onDelete?: (id: string) => void;
};

export default function DocumentCard({
  document,
  onDelete,
}: Props) {

  const router =
    useRouter();

  const handleDelete = () => {

    const confirmed =
      window.confirm(
        "Delete this document?"
      );

    if (!confirmed) {
      return;
    }

    onDelete?.(
      document._id
    );
  };

  return (

    <div className="rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-md">

      <div className="flex justify-between items-start">

        <div className="flex gap-4">

          <div className="rounded-lg bg-primary/10 p-3">

            <FileText className="h-6 w-6" />

          </div>

          <div>

            <h3 className="text-lg font-semibold">
              {document.originalName}
            </h3>

            <div className="mt-2 flex items-center gap-3">

              <StatusBadge
                status={document.status}
              />

              <span className="text-sm text-muted-foreground">

                {(document.fileSize / 1024 / 1024).toFixed(2)}
                {" "}
                MB

              </span>

            </div>

            <p className="mt-2 text-sm text-muted-foreground">

              Uploaded{" "}
              {new Date(
                document.createdAt
              ).toLocaleDateString()}

            </p>

          </div>

        </div>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          onClick={() =>
            router.push(
              `/documents/${document._id}`
            )
          }
          className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted transition"
        >
          <Eye size={16} />
          View Details
        </button>

        <button
          onClick={() =>
            router.push(
              `/documents/${document._id}`
            )
          }
          className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted transition"
        >
          <GraduationCap size={16} />
          Generate Exam
        </button>

        <button
          onClick={() =>
            router.push(
              `/documents/${document._id}`
            )
          }
          className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted transition"
        >
          <Brain size={16} />
          Ask AI
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 rounded-md border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>

  );
}