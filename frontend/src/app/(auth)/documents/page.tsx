"use client";

import { useMemo, useState } from "react";

import {
  FileText,
  CheckCircle2,
  Loader2,
  HardDrive,
} from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import PageHeader from "@/components/ui/page-header";
import StatCard from "@/components/ui/stat-card";
import SectionCard from "@/components/ui/section-card";

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

  const documents = data?.documents ?? [];

  const stats =
    useMemo(() => {

      const processed =
        documents.filter(
          (d: any) =>
            d.status === "processed"
        ).length;

      const processing =
        documents.filter(
          (d: any) =>
            d.status === "processing"
        ).length;

      const totalSize =
        documents.reduce(
          (sum: number, doc: any) =>
            sum + (doc.fileSize ?? 0),
          0
        );

      return {

        total: documents.length,

        processed,

        processing,

        storage:
          (
            totalSize /
            1024 /
            1024
          ).toFixed(1),

      };

    }, [documents]);

  if (isLoading) {

    return (

      <PageContainer>

        <div className="py-20 text-center">

          Loading documents...

        </div>

      </PageContainer>

    );

  }

  return (

    <PageContainer>

      <PageHeader
        title="Documents"
        description="Manage your uploaded study material."
        action={
          <UploadButton
            onSelect={(file) =>
              upload.mutate({
                file,
                onUploadProgress:
                  setProgress,
              })
            }
          />
        }
      />

      {/* Statistics */}

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Documents"
          value={stats.total}
          subtitle="Uploaded"
          icon={FileText}
        />

        <StatCard
          title="Processed"
          value={stats.processed}
          subtitle="Ready"
          icon={CheckCircle2}
        />

        <StatCard
          title="Processing"
          value={stats.processing}
          subtitle="In Progress"
          icon={Loader2}
        />

        <StatCard
          title="Storage"
          value={`${stats.storage} MB`}
          subtitle="Used"
          icon={HardDrive}
        />

      </div>

      {/* Upload Progress */}

      {upload.isPending && (

        <SectionCard
          title="Uploading Document"
          className="mb-8"
        >

          <div className="space-y-4">

            <div className="h-3 overflow-hidden rounded-full bg-muted">

              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="flex items-center justify-between">

              <span className="text-sm text-muted-foreground">

                Uploading...

              </span>

              <span className="font-semibold">

                {progress}%

              </span>

            </div>

          </div>

        </SectionCard>

      )}

      {/* Document Library */}

      <SectionCard title="Document Library">

        <DocumentGrid
          documents={documents}
          onDelete={(id) =>
            remove.mutate(id)
          }
        />

      </SectionCard>

    </PageContainer>

  );

}