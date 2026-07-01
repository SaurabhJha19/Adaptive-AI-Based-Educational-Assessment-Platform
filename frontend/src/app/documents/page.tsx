"use client";

import { useState } from "react";

import UploadButton from "@/features/documents/components/upload-button";
import DocumentGrid from "@/features/documents/components/document-grid";

import { useDocuments } from "@/features/documents/use-documents";
import { useUploadDocument } from "@/features/documents/use-upload-document";
import { useDeleteDocument } from "@/features/documents/use-delete-document";

export default function DocumentsPage() {

  const {
    data,
    isLoading,
  } = useDocuments();

  const upload =
    useUploadDocument();

  const remove =
    useDeleteDocument();

  const [
    progress,
    setProgress,
  ] = useState(0);

  if (isLoading) {

    return (
      <div>
        Loading documents...
      </div>
    );
  }

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Documents
          </h1>

          <p className="text-muted-foreground">
            Manage your uploaded study material.
          </p>

        </div>

        <UploadButton
          onSelect={(file) =>
            upload.mutate({
              file,
              onUploadProgress:
                setProgress,
            })
          }
        />

      </div>

      {upload.isPending && (

        <div className="rounded-lg border p-4">

          <p>
            Uploading...
          </p>

          <div className="mt-2 h-2 rounded bg-muted">

            <div
              className="h-2 rounded bg-primary transition-all"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="mt-2 text-sm">
            {progress}%
          </p>

        </div>

      )}

      <DocumentGrid
        documents={
          data?.documents ?? []
        }
        onDelete={(id) =>
          remove.mutate(id)
        }
      />

    </div>

  );
}