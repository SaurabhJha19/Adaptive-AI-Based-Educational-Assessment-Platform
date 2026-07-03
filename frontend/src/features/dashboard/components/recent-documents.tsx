"use client";

import SectionCard from "@/components/shared/section-card";

type Props = {
  documents: any[];
};

export default function RecentDocuments({
  documents,
}: Props) {
  return (
    <SectionCard
      title="Recent Documents"
      description="Recently uploaded study material."
    >
      <div className="space-y-4">
        {documents.length === 0 && (
          <p className="text-muted-foreground">
            No documents uploaded.
          </p>
        )}

        {documents.map((doc) => (
          <div
            key={doc._id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <p className="font-medium">
                {doc.originalName}
              </p>

              <p className="text-sm text-muted-foreground">
                {doc.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}